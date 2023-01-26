import { createBrowserRouter } from 'react-router-dom';

import { GamePage } from '../components/GamePage';
import { LoginForm } from '../components/LoginForm';
import { Profile } from '../components/Profile';
import { SearchPage } from '../components/SeachPage';
import { IUser } from '../types/user';
import { getRequest } from '../utils/dataLoaders';

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
      sessionStorage.setItem('currentUser', JSON.stringify(user[0]));

      return user[0];
    },
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/game/:gameId/:enemyId',
    element: <GamePage />,
    loader: async ({ params }) => {
      const { enemyId } = params;
      const enemy: IUser[] = await getRequest(`/user/${enemyId}`);

      return enemy[0];
    },
  },
]);
