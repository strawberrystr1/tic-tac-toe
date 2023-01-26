import { IStep } from '../types/gamePage';
import { IUser } from '../types/user';

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('currentUser') as string) as IUser;
};

export const getGameResult = (result: string) => {
  if (/Draw/g.test(result)) {
    return -1;
  } else {
    const user = result.split(' ').find(e => +e);
    console.log(user);
    return user;
  }
};

export const createHistoryCells = (matrix: number[][], steps: IStep[]) => {
  console.log('steps: ', steps);
  return matrix;
};

export const createEmptyGameMatrix = (size: number) => {
  return new Array(size).fill(new Array(size).fill(0));
};
