import { useEffect, useState } from 'react';
// import { useLoaderData } from 'react-router-dom';
import { io } from 'socket.io-client';

import { SOCKET_URL } from '../../constants';
import { IUser } from '../../types/user';
import { getCurrentUser } from '../../utils/utils';

import EnemyItem from './components/EnemyItem';
import { Wrapper } from './styled';

export const SearchPage = () => {
  // const preloadedUsers = useLoaderData() as IUser[];

  const [users, setUsers] = useState<IUser[]>([]);
  const currentUser = getCurrentUser();

  const socket = io(SOCKET_URL);

  useEffect(() => {
    socket.on('new user', data => {
      setUsers(prev => [JSON.parse(data), ...prev]);
    });

    socket.on('join to search', data => setUsers(JSON.parse(data)));

    socket.emit('search', JSON.stringify({ user: currentUser }));
  }, []);

  return (
    <Wrapper>
      {users.map(user => (
        <EnemyItem key={user.id} user={user} />
      ))}
    </Wrapper>
  );
};
