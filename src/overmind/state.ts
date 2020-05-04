import { ICity, IComment, IOffer, IUser } from 'src/interfaces';
import { Derive } from './index';

type State = {
  user: IUser | null;
  isUserAuth: boolean;
  currentCity: ICity | null;
  offers: IOffer[] | [];
  cities: ICity[] | null;
  favorite: IOffer[] | null;
  sorting: string;
  activeOffer: number | null;
  comments: IComment[] | null;
  isLoading: boolean;
  currentOffers: Derive<State, IOffer[]>;
  currentOffersCount: Derive<State, number>;
};

export const state: State = {
  user: null,
  isUserAuth: false,
  currentCity: null,
  offers: [],
  cities: null,
  favorite: null,
  sorting: `popular`,
  activeOffer: null,
  comments: null,
  isLoading: false,
  currentOffers: ({ offers, currentCity, sorting }) => {
    return offers
      .filter((offer) => offer?.city.name === currentCity.name)
      .sort((a: IOffer, b: IOffer) => {
        let sort: number;
        switch (sorting) {
          case `popular`:
            break;
          case `to-high`:
            sort = a.price - b.price;
            break;
          case `to-low`:
            sort = b.price - a.price;
            break;
          case `top-rated`:
            sort = b.rating - a.rating;
            break;
          default:
            break;
        }
        return sort;
      });
  },
  currentOffersCount: ({ currentOffers }) => currentOffers?.length,
};
