import { IUser } from './user';

export interface ILoaderData {
  user: IUser;
  history: IHistoryResponse;
}

export interface IHistoryResponse {
  id: number;
  name: string;
  histories: IHistory[];
}

export interface IHistory {
  id: number;
  steps: string;
  winner: number;
  gameId: string;
  users: IUser[];
}
