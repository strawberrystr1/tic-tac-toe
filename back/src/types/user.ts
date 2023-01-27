export interface IUser {
  id: number;
  name: string;
  rating: number;
}

export interface IUserCreation {
  name: string;
}

export interface IUpdateRatingPayload {
  id: number;
  rating: number;
}