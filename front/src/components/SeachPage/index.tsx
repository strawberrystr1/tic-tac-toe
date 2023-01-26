import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';

import { SOCKET_URL } from '../../constants';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { SearchEvents } from '../../types/searchPage';
import { IUser } from '../../types/user';

import { ChalengedDialog } from './components/ChalengedDialog';
import EnemyItem from './components/EnemyItem';
import { WaitingEnemyDialog } from './components/WaitingEnemyDialog';
import { Wrapper } from './styled';

export const SearchPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isWaitingForEnemy, setIsWaitingForEnemy] = useState(false);
  const [userBeenChalenged, setUserBeenChalenged] = useState(false);
  const [enemyId, setEnemyId] = useState(0);
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const socket = io(SOCKET_URL);

  useEffect(() => {
    if (currentUser) {
      socket.on(SearchEvents.NEW_USER, data => {
        setUsers(prev => {
          const newUser = JSON.parse(data).user as IUser;
          if (prev.some(u => u.id === newUser.id && currentUser.id !== u.id)) return prev;
          return [newUser, ...prev];
        });
      });

      socket.on(SearchEvents.JOIN_TO_SEARCH, data => {
        setUsers(JSON.parse(data));
      });

      socket.on(SearchEvents.LEAVE_SEARCH, data =>
        setUsers(prev => {
          return prev.filter(e => e.id !== data);
        })
      );

      socket.on(SearchEvents.NOTIFY_ENEMY, data => {
        const { from, to } = JSON.parse(data);
        if (currentUser.id === to) {
          setUserBeenChalenged(true);
          setEnemyId(from);
        }
      });

      socket.on(SearchEvents.DECLINE_MATCH, data => {
        if (currentUser.id === +data && userBeenChalenged) {
          setUserBeenChalenged(false);
        }

        if (currentUser.id === +data) {
          setIsWaitingForEnemy(false);
        }
        setEnemyId(0);
      });

      socket.on(SearchEvents.ACCEPT_MATCH, data => {
        const { gameId, userId } = JSON.parse(data);
        if (currentUser.id === +userId) {
          navigate(`/game/${gameId}/${enemyId}`);
        }
      });

      socket.emit(SearchEvents.SEARCH, JSON.stringify({ user: currentUser }));
    }

    return () => {
      socket.emit(SearchEvents.LEAVE_SEARCH, currentUser?.id);
      socket.off(SearchEvents.NEW_USER);
      socket.off(SearchEvents.JOIN_TO_SEARCH);
      socket.off(SearchEvents.NOTIFY_ENEMY);
      socket.off(SearchEvents.LEAVE_SEARCH);
      socket.off(SearchEvents.DECLINE_MATCH);
      socket.off(SearchEvents.ACCEPT_MATCH);
    };
  }, [currentUser, enemyId]);

  const notifyEnemy = (id: number) => {
    socket.emit('notify enemy', JSON.stringify({ from: currentUser?.id, to: id }));
    setIsWaitingForEnemy(true);
    setEnemyId(id);
  };

  const closeWaitingEnemyDialog = () => {
    socket.emit('decline match', enemyId);
    setIsWaitingForEnemy(false);
  };

  const closeChallengedDialog = () => {
    socket.emit('decline match', enemyId);
    setUserBeenChalenged(false);
  };

  const acceptGameHandler = () => {
    const gameId = v4();
    socket.emit('accept game', JSON.stringify({ gameId: gameId, userId: enemyId }));

    navigate(`/game/${gameId}/${enemyId}`);
  };

  return (
    <Wrapper>
      {!!users.length ? (
        <Typography fontWeight={600} fontSize={24} component="h2">
          Players looking for a game
        </Typography>
      ) : (
        <Typography fontWeight={600} fontSize={24} component="h2">
          No players looking for a game
        </Typography>
      )}
      {users.map(user => (
        <EnemyItem key={user.id} user={user} notifyEnemy={notifyEnemy} />
      ))}
      <WaitingEnemyDialog open={isWaitingForEnemy} closeHandler={closeWaitingEnemyDialog} />
      <ChalengedDialog
        open={userBeenChalenged}
        closeHandler={closeChallengedDialog}
        acceptHandler={acceptGameHandler}
      />
    </Wrapper>
  );
};
