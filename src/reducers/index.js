import { combineReducers } from "redux";

import {User} from "./userReducer"
import {Followers} from "./followerReducer"
import {Auth} from "./authReducer"

export default combineReducers({
  User,
  Followers,
  Auth
});
