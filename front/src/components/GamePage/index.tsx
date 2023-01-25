import { useEffect } from 'react';
import { io } from 'socket.io-client';

import { SOCKET_URL } from '../../constants';

export const GamePage = () => {
  const socket = io(SOCKET_URL);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });
  }, []);
  return <div>GamePage</div>;
};
