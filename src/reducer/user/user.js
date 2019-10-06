import {transformKeysToCamel} from "src/helpers";

const initialState = {
  userData: null,
  isUserAuth: false
};

const ActionType = {
  LOAD_USER: `LOAD_USER`
};

const Operation = {
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
    case ActionType.LOAD_USER:
      return Object.assign({}, state, {
        userData: action.payload,
        isUserAuth: true
      });
  }

  return state;
};

const ActionCreator = {
  loadUser: (userData) => {
    return {
      type: ActionType.LOAD_USER,
      payload: userData
    };
  }
};

export {reducer, ActionCreator, ActionType, Operation};
