import { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { UserContext } from '../../App';
import { ILoaderData } from '../../types/profilePage';
import { Header } from '../Header';

import { HistoryItem } from './components/HistoryItem';
import { Avatar, SideWrapper, Wrapper } from './styled';

export const Profile = () => {
  const { user, history } = useLoaderData() as ILoaderData;
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleClick = () => navigate('/search');
  const handleLeaderboardClick = () => navigate('/leaderboard');

  useEffect(() => {
    setCurrentUser(user);
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        <SideWrapper>
          <Avatar>
            <Typography fontSize={30}>{user.name[0].toUpperCase()}</Typography>
          </Avatar>
          <Typography fontSize={20}>ID: {user.id}</Typography>
          <Typography fontSize={30}>{user.name}</Typography>
          <Typography fontSize={24} sx={{ mb: 3 }}>
            Rating: {user.rating}
          </Typography>
          <Button onClick={handleClick} variant="contained" sx={{ mb: 2 }}>
            Find a game
          </Button>
          <Button onClick={handleLeaderboardClick} color="success" variant="contained">
            Leaderboard
          </Button>
        </SideWrapper>
        <SideWrapper>
          <Typography component="h2" fontSize={22} fontWeight={600}>
            Games history
          </Typography>
          {history.histories.map(item => (
            <HistoryItem history={item} key={item.gameId} currentUser={user} />
          ))}
        </SideWrapper>
      </Wrapper>
    </>
  );
};
