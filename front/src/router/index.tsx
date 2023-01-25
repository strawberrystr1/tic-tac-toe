import { createBrowserRouter } from 'react-router-dom';

import { GamePage } from '../components/GamePage';
import { LoginForm } from '../components/LoginForm';
import { Profile } from '../components/Profile';
import { SearchPage } from '../components/SeachPage';
import { IUser } from '../types/user';
import { getRequest } from '../utils/dataLoaders';
import { getCurrentUser } from '../utils/utils';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/profile/:id',
    element: <Profile />,
    loader: async ({ params }) => {
      const user = await getRequest<IUser[]>(`/user/${params.id}`);
      localStorage.setItem('currentUser', JSON.stringify(user[0]));

      return user[0];
    },
  },
  {
    path: '/search',
    element: <SearchPage />,
    loader: async () => {
      const currentUser = getCurrentUser();
      const users = await getRequest<IUser[]>(`/user?except=${currentUser.id}`);

      return users;
    },
  },
  {
    path: '/game/:gameId',
    element: <GamePage />,
  },
]);
