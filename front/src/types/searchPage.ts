import { IUser } from './user';

export interface IProps {
  user: IUser;
  notifyEnemy: (id: number) => void;
}

export interface IWaitingForEnemyProps {
  open: boolean;
  closeHandler: () => void;
}

export interface IChalendegDialogProps extends IWaitingForEnemyProps {
  acceptHandler: () => void;
}

export enum SearchEvents {
  SEARCH = 'search',
  JOIN_TO_SEARCH = 'join to search',
  NEW_USER = 'new user',
  LEAVE_SEARCH = 'leave search',
  NOTIFY_ENEMY = 'notify enemy',
  DECLINE_MATCH = 'decline match',
  ACCEPT_MATCH = 'accept game',
}
