import {ActionType} from 'src/constants';

const initialState = {
  userData: null,
  isUserAuth: false
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

export {reducer};
