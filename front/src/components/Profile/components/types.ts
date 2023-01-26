import { IHistory } from '../../../types/profilePage';
import { IUser } from '../../../types/user';

export interface IHistoryItemProps {
  history: IHistory;
  currentUser: IUser;
}
