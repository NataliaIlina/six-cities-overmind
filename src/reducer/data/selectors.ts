import { createSelector } from "reselect";
import { State } from "./data";
import { IOffer, IComment, ICity } from "src/interfaces";

export const getOffers = (state: State): IOffer[] => {
  return state[`DATA`].offers;
};

export const getFavorite = (state: State): IOffer[] => {
  return state[`DATA`].favorite;
};

export const getComments = (state: State): IComment[] => {
  return state[`DATA`].comments;
};

export const getCurrentCity = (state: State): ICity => {
  return state[`DATA`].currentCity;
};
export const getSorting = (state: State): string => {
  return state[`DATA`].sorting;
};

export const getActiveOffer = (state: State): IOffer => {
  return state[`DATA`].activeOffer;
};

export const getCurrentOffer = (state: State, props: any): number => {
  return parseInt(props.match.params.id, 10);
};

export const getCitiesList = createSelector(getOffers, offers => {
  const cities = [];
  offers.forEach((offer: IOffer) => {
    if (!cities.some(city => city.name === offer.city.name)) {
      cities.push(offer.city);
    }
    return;
  });
  return cities;
});

export const getOffersForCurrentCity = createSelector(
  getOffers,
  getCurrentCity,
  (offers, city) => offers.filter((it: IOffer) => it.city.name === city.name)
);

export const getOffersByCount = createSelector(
  getOffers,
  getCurrentCity,
  getCurrentOffer,
  (offers, city, currentOfferId) => {
    const currentOffer = offers.find((it: IOffer) => it.id === currentOfferId);
    const nearOffers = offers
      .filter(
        (it: IOffer) => it.city.name === city.name && it.id !== currentOfferId
      )
      .slice(0, 3);
    nearOffers.push(currentOffer);
    return nearOffers;
  }
);

export const getCurrentOfferById = createSelector(
  getOffers,
  getCurrentOffer,
  (offers, currentOffer) =>
    offers.find((offer: IOffer) => offer.id === currentOffer)
);

export const getOffersForCurrentSorting = createSelector(
  getOffers,
  getCurrentCity,
  getSorting,
  (offers, city, sorting) =>
    offers
      .filter((it: IOffer) => it.city.name === city.name)
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
      })
);
