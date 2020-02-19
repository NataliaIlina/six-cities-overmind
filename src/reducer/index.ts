import { combineReducers } from "redux";
import { reducer as user, UserState } from "./user/user";
import { reducer as data, State } from "./data/data";

export default combineReducers({
  USER: user,
  DATA: data
});

export interface RootStateType {
  user: UserState;
  data: State;
}
