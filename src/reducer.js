import {createSelector} from "reselect";
import {transformKeysToCamel} from "./helpers";

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

const getFirstCityFromOffers = (offers) => {
  return offers[0].city;
};

export const getOffers = (state) => {
  return state.offers;
};
export const getCurrentCity = (state) => {
  return state.currentCity;
};

export const getOffersForCurrentCity = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => offers.filter((it) => it.city.name === city.name)
);

const initialState = {
  currentCity: {},
  offers: [],
  cities: [],
  favorite: [],
  user: null
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_OFFERS: `CHANGE_OFFERS`,
  RESET_STATE: `RESET_STATE`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVORITE: `LOAD_FAVORITE`,
  LOAD_USER: `LOAD_USER`
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api
      .get(`/hotels`)
      .then((response) => {
        return transformKeysToCamel(response.data);
      })
      .then((data) => {
        dispatch(ActionCreator.loadOffers(data));
      });
  },
  loadFavorite: () => (dispatch, _getState, api) => {
    return api
      .get(`/favorite`)
      .then((response) => {
        return transformKeysToCamel(response.data);
      })
      .then((data) => {
        dispatch(ActionCreator.loadFavorite(data));
      });
  },
  loadUser: () => (dispatch, _getState, api) => {
    return api
      .get(`/login`)
      .then((response) => {
        return transformKeysToCamel(response.data);
      })
      .then((data) => {
        dispatch(ActionCreator.loadUser(data));
      });
  },
  authorizeUser: (email, password) => (dispatch, _getState, api) => {
    return api
      .post(`/login`, {email, password})
      .then((response) => {
        return transformKeysToCamel(response.data);
      })
      .then((data) => {
        dispatch(ActionCreator.loadUser(data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        currentCity: action.payload
      });

    case ActionType.RESET_STATE:
      return Object.assign({}, initialState);

    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
        cities: getCitiesFromOffers(action.payload),
        currentCity: getFirstCityFromOffers(action.payload)
      });

    case ActionType.LOAD_FAVORITE:
      return Object.assign({}, state, {
        favorite: action.payload
      });

    case ActionType.LOAD_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
  }

  return state;
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city
    };
  },
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers
    };
  },
  loadFavorite: (offers) => {
    return {
      type: ActionType.LOAD_FAVORITE,
      payload: offers
    };
  },
  loadUser: (user) => {
    return {
      type: ActionType.LOAD_USER,
      payload: user
    };
  }
};

export {reducer, ActionCreator, ActionType, Operation};
