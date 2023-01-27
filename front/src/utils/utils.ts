import { IStep } from '../types/gamePage';
import { IUser } from '../types/user';

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('currentUser') as string) as IUser;
};

export const createEmptyGameMatrix = (size: number) => {
  const outer = new Array(size).fill(0);
  return outer.map(() => new Array(size).fill(0));
};

export const createHistoryCells = (size: number, steps: IStep[], pointer: number) => {
  const copy = createEmptyGameMatrix(size);

  steps.slice(0, pointer).forEach(step => {
    const [row, column] = step.cell;
    copy[row][column] = step.icon;
  });

  return copy;
};
