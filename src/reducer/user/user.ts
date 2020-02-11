import { ActionType } from "src/constants";
import { IUser } from "src/interfaces";

export type UserState = {
  userData: IUser | null;
  isUserAuth: boolean;
};

const initialState: UserState = {
  userData: null,
  isUserAuth: false
};

const reducer = (
  state: UserState = initialState,
  action: { type: ActionType; payload: any }
) => {
  switch (action.type) {
    case ActionType.LOAD_USER:
      return Object.assign({}, state, {
        userData: action.payload,
        isUserAuth: action.payload ? true : false
      });
  }

  return state;
};

export { reducer };
