import { ICity, IComment, IOffer, IUser } from 'src/types';
import { Derive } from './index';

type State = {
  user: IUser | null;
  isUserAuth: boolean;
  currentCity: ICity | null;
  offers: IOffer[] | [];
  cities: ICity[] | null;
  favorite: { [key: string]: IOffer[] } | {};
  sorting: string;
  activeOfferId: number | null;
  comments: IComment[] | [];
  isLoading: boolean;
  currentOffers: Derive<State, IOffer[]>;
  currentOffersCount: Derive<State, number>;
  activeOffer: Derive<State, IOffer>;
  nearbyOffers: Derive<State, IOffer[]>;
};

export const state: State = {
  user: null,
  isUserAuth: false,
  currentCity: null,
  offers: [],
  cities: null,
  favorite: {},
  sorting: `popular`,
  activeOfferId: null,
  comments: [],
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
  activeOffer: ({ activeOfferId, offers }) => {
    return offers.find((offer) => offer.id === activeOfferId);
  },
  nearbyOffers: ({ activeOfferId, offers, currentCity, activeOffer }) => {
    const nearbyOffers = offers
      .filter((offer) => offer.city.name === currentCity.name && offer.id !== activeOfferId)
      .slice(0, 3);
    nearbyOffers.push(activeOffer);
    return nearbyOffers;
  },
};
