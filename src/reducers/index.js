import { combineReducers } from "redux";

import { UserList } from "./userListReducer";
import { UserFollowers } from "./userFollowersReducer";
import { Auth } from "./authReducer";
import { User } from "./userReducer";
import {UserFollowing} from "./userFollowingReducer"
import {UserRepos} from "./userReposReducer"

export default combineReducers({
  UserList,
  User,
  UserFollowers,
  UserFollowing,
  UserRepos,
  Auth
});
