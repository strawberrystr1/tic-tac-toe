import { createContext, ReactNode, useMemo, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';

import { IUser, IUserContext } from './types/user';

const initialState: IUserContext = {
  currentUser: undefined,
  setCurrentUser: () => {},
};

export const UserContext = createContext(initialState);

function App({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<IUser>();

  const state = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser]
  );

  return (
    <Container sx={{ height: '100%', width: '100%' }} maxWidth="xl">
      <CssBaseline />
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </Container>
  );
}

export default App;
