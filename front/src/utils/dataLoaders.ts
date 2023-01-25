import { API_URL } from '../constants';

export const getRequest = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`);
  const data: T = await response.json();

  return data;
};
