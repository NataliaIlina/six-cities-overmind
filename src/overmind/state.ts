import { ICity, IComment, IOffer } from 'src/types';
import { Derive } from './index';
import { getCitiesFromOffers } from 'src/utils';

type State = {
  currentCity: ICity | null;
  offers: IOffer[] | [];
  favorite: { [key: string]: IOffer[] } | {};
  sorting: string;
  activeOfferId: number | null;
  comments: IComment[] | [];
  isLoading: boolean;
  currentOffers: Derive<State, IOffer[]>;
  currentOffersCount: Derive<State, number>;
  activeOffer: Derive<State, IOffer>;
  nearbyOffers: Derive<State, IOffer[]>;
  cities: Derive<State, ICity[]>;
};

export const state: State = {
  offers: [],
  favorite: {},
  comments: [],
  currentCity: null,
  sorting: `popular`,
  activeOfferId: null,
  isLoading: false,
  cities: ({ offers }) => {
    return getCitiesFromOffers(offers);
  },
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
