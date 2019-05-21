import {cities} from "src/mocks/cities";

const DEFAULT_CITY = `Paris`;

const initialState = {
  city: DEFAULT_CITY,
  offers: cities[DEFAULT_CITY].offers
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_OFFERS: `CHANGE_OFFERS`,
  RESET_STATE: `RESET_STATE`
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload
      });

    case ActionType.CHANGE_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });

    case ActionType.RESET_STATE:
      return Object.assign({}, initialState);
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
  changeOffers: (city) => {
    return {
      type: ActionType.CHANGE_OFFERS,
      payload: cities[city].offers
    };
  }
};

export {reducer, ActionCreator};
