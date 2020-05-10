import { API } from 'src/utils';
import { IComment, IOffer } from 'src/types';
import page from 'page';

export type IParams = {
  [param: string]: string;
} | void;

export const router = {
  initialize(routes: { [url: string]: (params: IParams) => void }) {
    Object.keys(routes).forEach((url) => {
      page(url, ({ params }) => routes[url](params));
    });
    page.start();
  },
  open: (url: string) => page.show(url),
};

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
