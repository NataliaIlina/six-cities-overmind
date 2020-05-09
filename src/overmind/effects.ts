import { API } from 'src/utils';
import { IComment, IOffer } from 'src/types';

export const api = {
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
