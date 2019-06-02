import {createSelector} from "reselect";
import {transformKeysToCamel, transformOffersForFavorite} from "./helpers";

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
  LOAD_USER: `LOAD_USER`,
  REPLACE_OFFER: `REPLACE_OFFER`
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
        const data = transformOffersForFavorite(response.data);
        return transformKeysToCamel(data);
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
  },
  toggleFavorite: (hotelId, status) => (dispatch, _getState, api) => {
    return api
      .post(`/favorite/${hotelId}/${status}`)
      .then((response) => {
        return transformKeysToCamel(response.data);
      })
      .then((offer) => {
        dispatch(ActionCreator.replaceOfferInState(offer));
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

    case ActionType.REPLACE_OFFER:
      return Object.assign({}, state, {
        offers: state.offers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          }
          return offer;
        })
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
  },
  replaceOfferInState: (offer) => {
    return {
      type: ActionType.REPLACE_OFFER,
      payload: offer
    };
  }
};

export {reducer, ActionCreator, ActionType, Operation};
