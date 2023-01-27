import { Dispatch, SetStateAction } from 'react';

export interface IUser {
  id: number;
  name: string;
  rating: number;
}

export interface IUserContext {
  currentUser: IUser | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUser | undefined>>;
}
