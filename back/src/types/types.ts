export enum HTTPCodes {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500
}

export interface IConnectToSearchRoomData {
  user: {
    id: number;
    name: string;
  };
}
