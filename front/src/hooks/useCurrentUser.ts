import { useContext, useEffect } from 'react';

import { UserContext } from '../App';
import { getCurrentUser } from '../utils/utils';

export const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(getCurrentUser());
    }
  }, []);

  return { currentUser, setCurrentUser };
};
