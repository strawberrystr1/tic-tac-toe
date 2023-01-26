export enum GameIcons {
  EMPTY = 0,
  X_ICON = 1,
  O_ICON = 2,
}

export interface IStep {
  cell: [number, number];
  user: string;
  icon: number;
}
