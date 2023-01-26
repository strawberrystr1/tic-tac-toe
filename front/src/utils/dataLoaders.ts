import { API_URL } from '../constants';

export const getRequest = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`);
  const data: T = await response.json();

  return data;
};

export const postRequest = async <T, P>(endpoint: string, body: T): Promise<P> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: P = await response.json();

  return data;
};
