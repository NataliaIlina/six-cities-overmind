import {
  transformKeysToCamel,
  transformOffersForFavorite,
  getRandomNumber
} from "src/helpers";

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
  comments: []
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORTING: `CHANGE_SORTING`,
  CHANGE_OFFERS: `CHANGE_OFFERS`,
  RESET_STATE: `RESET_STATE`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVORITE: `LOAD_FAVORITE`,
  REPLACE_OFFER: `REPLACE_OFFER`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  LOAD_COMMENTS: `LOAD_COMMENTS`
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
  toggleFavorite: (hotelId, status) => (dispatch, _getState, api) => {
    return api
      .post(`/favorite/${hotelId}/${status}`)
      .then((response) => {
        return transformKeysToCamel(response.data);
      })
      .then((offer) => {
        dispatch(ActionCreator.replaceOfferInState(offer));
      });
  },
  loadComments: (hotelId) => (dispatch, _getState, api) => {
    return api
      .post(`/comments/${hotelId}`)
      .then((response) => {
        return transformKeysToCamel(response.data);
      })
      .then((comments) => {
        dispatch(ActionCreator.loadComments(comments));
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
        currentCity: getRandomCityFromOffers(action.payload)
      });

    case ActionType.LOAD_FAVORITE:
      return Object.assign({}, state, {
        favorite: action.payload
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

    case ActionType.CHANGE_SORTING:
      return Object.assign({}, state, {
        sorting: action.payload
      });

    case ActionType.SET_ACTIVE_OFFER:
      return Object.assign({}, state, {
        activeOffer: action.payload
      });

    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, state, {
        hotelId: action.payload
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
  replaceOfferInState: (offer) => {
    return {
      type: ActionType.REPLACE_OFFER,
      payload: offer
    };
  },
  changeSorting: (value) => {
    return {
      type: ActionType.CHANGE_SORTING,
      payload: value
    };
  },
  setActiveOffer: (id) => {
    return {
      type: ActionType.SET_ACTIVE_OFFER,
      payload: id
    };
  },
  loadComments: (id) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: id
    };
  }
};

export {reducer, ActionCreator, ActionType, Operation};
