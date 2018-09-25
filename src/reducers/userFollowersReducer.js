import {perPage} from "../actions/userActions"
const initialState = {
  followers: [],
  pagination: 1,
  fetching: false,
  fetched: false,
  error: null
};

export const UserFollowers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_FOLLOWERS":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_USER_FOLLOWERS_SUCCESS":
      var totalCount = action.payload.length;
      var maxPages = totalCount / perPage;
      var zeroBasedList = Array.from(Array(Math.ceil(maxPages)).keys());
      var paginationNumList = Array.from(zeroBasedList.map(el => el + 1));
      
      return Object.assign({}, state, {
        followers: action.payload,
        pagination: paginationNumList,
        fetching: false,
        fetched: true
      });
    case "GET_USER_FOLLOWERS_FAILED":
      return Object.assign({}, state, {
        error: action.payload,
        fetching: false
      });
    default:
      return state;
  }
};