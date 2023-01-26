import { IUser } from '../types/user';

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('currentUser') as string) as IUser;
};
