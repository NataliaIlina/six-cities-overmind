import { createSelector } from "reselect";

export const getOffers = state => {
  return state[`DATA`].offers;
};

export const getFavorite = state => {
  return state[`DATA`].favorite;
};

export const getComments = state => {
  return state[`DATA`].comments;
};

export const getCurrentCity = state => {
  return state[`DATA`].currentCity;
};
export const getSorting = state => {
  return state[`DATA`].sorting;
};

export const getActiveOffer = state => {
  return state[`DATA`].activeOffer;
};

export const getCurrentOffer = (state, props) => {
  return parseInt(props.match.params.id, 10);
};

export const getCitiesList = createSelector(getOffers, offers => {
  const cities = [];
  offers.forEach(offer => {
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
  (offers, city) => offers.filter(it => it.city.name === city.name)
);

export const getOffersByCount = createSelector(
  getOffers,
  getCurrentCity,
  getCurrentOffer,
  (offers, city, currentOfferId) => {
    const currentOffer = offers.find(it => it.id === currentOfferId);
    const nearOffers = offers
      .filter(it => it.city.name === city.name && it.id !== currentOfferId)
      .slice(0, 3);
    nearOffers.push(currentOffer);
    return nearOffers;
  }
);

export const getCurrentOfferById = createSelector(
  getOffers,
  getCurrentOffer,
  (offers, currentOffer) => offers.find(offer => offer.id === currentOffer)
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
      })
);
