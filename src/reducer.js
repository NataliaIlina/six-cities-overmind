import {offers} from "src/mocks/offers";

const DEFAULT_CITY = `Paris`;

const initialState = {
  city: DEFAULT_CITY,
  offers: offers[DEFAULT_CITY],
  cities: Object.keys(offers)
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
        city: action.payload,
        offers: offers[action.payload]
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
  }
};

export {reducer, ActionCreator, ActionType};
