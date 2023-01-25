import { IUser } from '../types/user';

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') as string) as IUser;
};
