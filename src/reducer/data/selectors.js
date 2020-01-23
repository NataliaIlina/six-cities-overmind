import { createSelector } from "reselect";

export const getOffers = state => {
  return state[`DATA`].offers;
};

export const getFavorite = state => {
  return state[`DATA`].favorite;
};

export const getCitiesList = createSelector(
  getOffers,
  offers => {
    const cities = [];
    offers.forEach(offer => {
      if (!cities.some(city => city.name === offer.city.name)) {
        cities.push(offer.city);
      }
      return;
    });
    return cities;
  },
);

export const getCurrentCity = state => {
  return state[`DATA`].currentCity;
};
export const getSorting = state => {
  return state[`DATA`].sorting;
};

export const getActiveOffer = (state, props) => {
  return props.match.params.id;
};

export const getOffersForCurrentCity = createSelector(
  getOffers,
  getCurrentCity,
  (offers, city) => offers.filter(it => it.city.name === city.name),
);

export const getCurrentOfferById = createSelector(
  getOffers,
  getActiveOffer,
  (offers, activeOffer) => offers.find(offer => offer.id === parseInt(activeOffer, 10)),
);

export const getOffersForCurrentSorting = createSelector(
  getOffers,
  getCurrentCity,
  getSorting,
  (offers, city, sorting) =>
    offers
      .filter(it => it.city.name === city.name)
      .sort((a, b) => {
        let sort;
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
      }),
);
