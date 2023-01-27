export interface ICreateHistoryPayload {
  userId: number;
  steps: {
    cell: [number, number];
    user: string;
    icon: number;
  }[];
  winner: number;
  gameId: string;
}

export interface IHistory {
  id: number;
  steps: string;
  winner: number;
  gameId: string;
}

export interface IHistoryCreate {
  steps: string;
  winner: number;
  gameId: string;
}