import {getRandomNumber} from "src/helpers";
import {ActionType} from 'src/constants';

const getCitiesFromOffers = (offers) => {
  const cities = [];
  offers.forEach((offer) => {
    if (!cities.some((city) => city.name === offer.city.name)) {
      cities.push(offer.city);
    }
    return;
  });
  return cities;
};

const getRandomCityFromOffers = (offers) => {
  return offers[getRandomNumber(0, offers.length - 1)].city;
};

const initialState = {
  currentCity: {},
  offers: [],
  cities: [],
  favorite: [],
  sorting: `popular`,
  activeOffer: null,
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        currentCity: action.payload,
      });

    case ActionType.RESET_STATE:
      return Object.assign({}, initialState);

    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
        cities: getCitiesFromOffers(action.payload),
        currentCity: getRandomCityFromOffers(action.payload),
      });

    case ActionType.LOAD_FAVORITE:
      return Object.assign({}, state, {
        favorite: action.payload,
      });

    case ActionType.REPLACE_OFFER:
      return Object.assign({}, state, {
        offers: state.offers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          }
          return offer;
        }),
      });

    case ActionType.CHANGE_SORTING:
      return Object.assign({}, state, {
        sorting: action.payload,
      });

    case ActionType.SET_ACTIVE_OFFER:
      return Object.assign({}, state, {
        activeOffer: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload,
      });
  }

  return state;
};

export {reducer};
