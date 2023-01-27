import { IUser } from './user';

export interface IHistoryPageState {
  user: IUser;
  currentUser: IUser;
  steps: string;
  winner: number;
}
