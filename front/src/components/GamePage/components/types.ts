import { GameIcons, IStep } from '../../../types/gamePage';

export interface ICellProps {
  cell: GameIcons;
  index: number;
  clickHandler: (index: number) => void;
}

export interface IWinDialogProps {
  open: boolean;
  closeHandler: () => void;
  message: string;
}

export interface IUSerBlockProps {
  userTurn: boolean;
  userIcon: GameIcons;
  name: string | undefined;
  enemy: boolean;
}

export interface IHistoryProps {
  steps: IStep[];
}

export interface IHistoryElementProps {
  clickHandler?: (step: IStep) => void;
  step: IStep;
}
