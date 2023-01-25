import { useLoaderData, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { IUser } from '../../types/user';

import { Avatar, SideWrapper, Wrapper } from './styled';

export const Profile = () => {
  const user = useLoaderData() as IUser;
  const navigate = useNavigate();

  const handleClick = () => navigate('/search');

  return (
    <Wrapper>
      <SideWrapper>
        <Avatar>
          <Typography fontSize={30}>{user.name[0].toUpperCase()}</Typography>
        </Avatar>
        <Typography fontSize={20}>ID: {user.id}</Typography>
        <Typography fontSize={30} sx={{ mb: 3 }}>
          {user.name}
        </Typography>
        <Button onClick={handleClick} variant="contained">
          Find a game
        </Button>
      </SideWrapper>
      <SideWrapper>asd</SideWrapper>
    </Wrapper>
  );
};
