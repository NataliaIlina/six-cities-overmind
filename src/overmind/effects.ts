import API from 'src/utils/api';
import { IComment, IOffer, IUser } from 'src/types';

export const api = {
  getCurrentUser: (): Promise<{ data: IUser }> => {
    return API.get('/login');
  },
  authorizeUser: (email: string, password: string): Promise<{ data: IUser }> => {
    return API.post(`/login`, { email, password });
  },
  fetchOffers: (): Promise<{ data: IOffer[] }> => {
    return API.get(`/hotels`);
  },
  fetchFavorite: (): Promise<{ data: IOffer[] }> => {
    return API.get(`/favorite`);
  },
  toggleFavoriteStatus: (hotelId, status): Promise<{ data: IOffer }> => {
    return API.post(`/favorite/${hotelId}/${status}`);
  },
  fetchComments: (hotelId): Promise<{ data: IComment[] }> => {
    return API.get(`/comments/${hotelId}`);
  },
  addComment: (hotelId: number, rating: number, comment: string): Promise<{ data: IComment[] }> => {
    return API.post(`/comments/${hotelId}`, { rating, comment });
  },
};
