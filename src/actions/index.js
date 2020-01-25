import {transformKeysToCamel, transformOffersForFavorite} from "src/helpers";
import {ActionType} from 'src/constants';


export const fetchUser = () => (dispatch, _getState, api) => {
  return api
    .get(`/login`)
    .then((response) => {
      return transformKeysToCamel(response.data);
    })
    .then((data) => {
      dispatch(getUser(data));
    });
};

export const authorizeUser = (email, password) => (dispatch, _getState, api) => {
  return api
    .post(`/login`, {email, password})
    .then((response) => {
      return transformKeysToCamel(response.data);
    })
    .then((data) => {
      dispatch(getUser(data));
    });
};

export const fetchOffers = () => (dispatch, _getState, api) => {
  return api
    .get(`/hotels`)
    .then((response) => {
      return transformKeysToCamel(response.data);
    })
    .then((data) => {
      dispatch(getOffers(data));
    });
};

export const fetchFavorite = () => (dispatch, _getState, api) => {
  return api
    .get(`/favorite`)
    .then((response) => {
      const data = transformOffersForFavorite(response.data);
      return transformKeysToCamel(data);
    })
    .then((data) => {
      dispatch(getFavorite(data));
    });
};

export const toggleFavoriteStatus = (hotelId, status) => (dispatch, _getState, api) => {
  return api
    .post(`/favorite/${hotelId}/${status}`)
    .then((response) => {
      return transformKeysToCamel(response.data);
    })
    .then((offer) => {
      dispatch(replaceOfferInState(offer));
    });
};

export const fetchComments = (hotelId) => (dispatch, _getState, api) => {
  return api
    .get(`/comments/${hotelId}`)
    .then((response) => {
      return transformKeysToCamel(response.data);
    })
    .then((comments) => {
      dispatch(getComments(comments));
    });
};

export const addComment = (hotelId, rating, comment) => (dispatch, _getState, api) => {
  return api.post(`/comments/${hotelId}`, {rating, comment}) .then((response) => {
    return transformKeysToCamel(response.data);
  })
  .then((comments) => {
    dispatch(getComments(comments));
  });
};

export const changeCity = (city) => {
  return {
    type: ActionType.CHANGE_CITY,
    payload: city,
  };
};
export const getOffers = (offers) => {
  return {
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  };
};
export const getFavorite = (offers) => {
  return {
    type: ActionType.LOAD_FAVORITE,
    payload: offers,
  };
};
export const replaceOfferInState = (offer) => {
  return {
    type: ActionType.REPLACE_OFFER,
    payload: offer,
  };
};
export const changeSorting = (value) => {
  return {
    type: ActionType.CHANGE_SORTING,
    payload: value,
  };
};

export const setActiveOffer = (id) => {
  return {
    type: ActionType.SET_ACTIVE_OFFER,
    payload: id,
  };
};

export const getComments = (id) => {
  return {
    type: ActionType.LOAD_COMMENTS,
    payload: id,
  };
};

export const getUser = (userData) => {
  return {
    type: ActionType.LOAD_USER,
    payload: userData
  };
};
