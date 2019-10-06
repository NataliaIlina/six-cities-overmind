import {combineReducers} from "redux";
import {reducer as user} from "./user/user";
import {reducer as data} from "./data/data";

export default combineReducers({
  USER: user,
  DATA: data
});
