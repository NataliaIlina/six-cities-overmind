import { API } from 'src/utils';
import { IUser } from 'src/types';

export const api = {
  getCurrentUser: (): Promise<{ data: IUser }> => {
    return API.get('/login');
  },
  authorizeUser: (email: string, password: string): Promise<{ data: IUser }> => {
    return API.post(`/login`, { email, password });
  },
};
