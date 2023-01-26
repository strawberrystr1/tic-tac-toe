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

export enum GameEvents {
  USER_CONNECT = 'user join',
  GAME_START = 'game start',
  USER_MOVE = 'user move',
  SET_ICON = 'set icon',
  END_GAME = 'end game',
}
