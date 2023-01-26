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
