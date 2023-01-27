import { useLoaderData } from 'react-router-dom';
import { Typography } from '@mui/material';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { IUser } from '../../types/user';

import { UserItem, Wrapper } from './styled';

export const Leaderboard = () => {
  const users = useLoaderData() as IUser[];
  const { currentUser } = useCurrentUser();

  return (
    <Wrapper>
      <Typography fontWeight={600} fontSize={40}>
        Leaderboard
      </Typography>
      {users.map((user, i) => (
        <UserItem
          key={user.id}
          sx={{ bgcolor: `${currentUser?.id === user.id ? '#63eb24ca' : 'transparent'}` }}
        >
          <Typography fontWeight={800} width={60}>
            {i + 1}.
          </Typography>
          <Typography fontSize={18} width={240}>
            User: {user.name}
          </Typography>
          <Typography fontSize={18} width={110} textAlign="right">
            Rating: {user.rating}
          </Typography>
        </UserItem>
      ))}
    </Wrapper>
  );
};
