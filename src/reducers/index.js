import { combineReducers } from "redux";

import { UserList } from "./userListReducer";
import { UserFollowers } from "./userFollowersReducer";
import { Auth } from "./authReducer";
import { User } from "./userReducer";

export default combineReducers({
  UserList,
  User,
  UserFollowers,
  Auth
});
