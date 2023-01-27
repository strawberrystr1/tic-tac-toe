import { useCallback, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { io } from 'socket.io-client';

import { SOCKET_URL } from '../../constants';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { GameEvents, GameIcons, IStep } from '../../types/gamePage';
import { IUser } from '../../types/user';
import { postRequest } from '../../utils/dataLoaders';
import { winChecker } from '../../utils/winChecker';

import GameCell from './components/GameCell';
import { HistoryBlock } from './components/History';
import { WinDialog } from './components/WinDialog';
import { GameArea, GameBlock, HeadBlock, UserBlock, Wrapper } from './styled';

export const GamePage = () => {
  const { gameId } = useParams();
  const { currentUser } = useCurrentUser();
  const enemy = useLoaderData() as IUser;
  const navigate = useNavigate();

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [cells, setCells] = useState<GameIcons[]>(new Array(9).fill(0));
  const [userIcon, setUserIcon] = useState<GameIcons>(0);
  const [userTurn, setUserTurn] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const [steps, setSteps] = useState<IStep[]>([]);
  const [winnerId, setWinnerId] = useState(-1);

  const socket = io(SOCKET_URL);

  useEffect(() => {
    if (currentUser) {
      socket.on(GameEvents.USER_CONNECT, data => {
        if (currentUser?.id !== +data) {
          console.log('user connected', data);
        }
      });

      socket.on(GameEvents.GAME_START, () => {
        setIsGameStarted(true);
      });

      socket.on(GameEvents.USER_MOVE, data => {
        const { moveIndex, user, icon } = JSON.parse(data);
        if (user.id !== currentUser.id) {
          setUserTurn(true);
        } else {
          setUserTurn(false);
        }

        const row = Math.floor(+moveIndex / 3);
        const column = +moveIndex % 3;
        const newStep: IStep = {
          cell: [row, column],
          user: user.name,
          icon: icon,
        };

        setSteps(prev => [...prev, newStep]);
        setCells(prev =>
          prev.map((el, i) => {
            return i === +moveIndex ? icon : el;
          })
        );
      });

      socket.on(GameEvents.SET_ICON, data => {
        const { icon, isFirst } = JSON.parse(data);

        setUserIcon(icon);
        setUserTurn(isFirst);
      });

      socket.on(GameEvents.END_GAME, data => {
        let resultString = '';
        if (+data < 0) {
          resultString = 'Draw\n Better luck next time';
        } else {
          resultString = `User ${currentUser.id === +data ? currentUser.name : enemy.name} win`;
          if (currentUser.id === +data) {
            resultString += '\n Congratulations';
          } else {
            resultString += '\n Better luck next time';
          }
        }

        setGameResult(resultString);
      });

      socket.emit(GameEvents.USER_CONNECT, JSON.stringify({ user: currentUser, game: gameId }));
    }

    return () => {
      socket.off(GameEvents.USER_CONNECT);
      socket.off(GameEvents.GAME_START);
      socket.off(GameEvents.END_GAME);
      socket.off(GameEvents.USER_MOVE);
      socket.off(GameEvents.SET_ICON);
    };
  }, [currentUser]);

  useEffect(() => {
    const result = winChecker(cells, 3);
    if (result) {
      setUserTurn(false);
      setWinnerId(result === userIcon ? (currentUser?.id as number) : enemy.id);
      socket.emit(
        GameEvents.END_GAME,
        JSON.stringify({
          winner: result === userIcon,
          userId: result === userIcon ? currentUser?.id : enemy.id,
          gameId,
        })
      );
      return;
    }
    if (!cells.some(e => e === 0) && !gameResult) {
      setUserTurn(false);
      setWinnerId(-1);
      socket.emit(GameEvents.END_GAME, JSON.stringify({ winner: 'draw', gameId }));
    }
  }, [cells]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (userTurn) {
        socket.emit(
          GameEvents.USER_MOVE,
          JSON.stringify({ moveIndex: index, gameId, user: currentUser, icon: userIcon })
        );
      }
    },
    [userTurn, userIcon]
  );

  const closeWinDialog = () => {
    navigate(`/profile/${currentUser?.id}`);
    postRequest('/history', {
      userId: currentUser?.id,
      steps,
      winner: winnerId,
      gameId,
    });
    postRequest('/user/rating', {
      id: currentUser?.id,
      rating:
        winnerId === currentUser?.id
          ? currentUser.rating + 25
          : winnerId < 0
          ? currentUser?.rating
          : (currentUser?.rating as number) - 25,
    });
  };

  return (
    <Wrapper>
      <GameBlock>
        <HeadBlock>
          <UserBlock sx={{ bgcolor: userTurn ? '#9de67b7d' : '#ce412e7c' }}>
            <Typography>You: {currentUser?.name}</Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              Icon:{' '}
              <Typography fontSize={20} fontWeight={600} component="span">
                {userIcon === 1 ? ' X' : ' O'}
              </Typography>
            </Typography>
            <Typography>{userTurn && 'Your turn'}</Typography>
          </UserBlock>
          <UserBlock sx={{ bgcolor: userTurn ? '#ce412e7c' : '#9de67b7d' }}>
            <Typography>Enemy: {enemy?.name}</Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              Icon:{' '}
              <Typography component="span" fontSize={20} fontWeight={600}>
                {userIcon === 1 ? ' O' : ' X'}
              </Typography>
            </Typography>
            <Typography>{!userTurn && 'Enemy turn'}</Typography>
          </UserBlock>
        </HeadBlock>
        {isGameStarted && (
          <GameArea>
            {cells.map((cell, i) => (
              <GameCell key={i} cell={cell} index={i} clickHandler={handleCellClick} />
            ))}
          </GameArea>
        )}
      </GameBlock>
      <HistoryBlock steps={steps} />
      <WinDialog open={!!gameResult} closeHandler={closeWinDialog} message={gameResult} />
    </Wrapper>
  );
};
