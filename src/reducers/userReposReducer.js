import {perPage} from "../actions/userActions"
const initialState = {
  repos: [],
  pagination: 1,
  fetching: false,
  fetched: false,
  error: null
};

export const UserRepos = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_REPOS":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_USER_REPOS_SUCCESS":
    // refactor computation to helper file
      var totalCount = action.payload.length;
      var maxPages = totalCount / perPage;
      var zeroBasedList = Array.from(Array(Math.ceil(maxPages)).keys());
      var paginationNumList = Array.from(zeroBasedList.map(el => el + 1));
      
      return Object.assign({}, state, {
        repos: action.payload,
        pagination: paginationNumList,
        fetching: false,
        fetched: true
      });
    case "GET_USER_REPOS_FAILED":
      return Object.assign({}, state, {
        error: action.payload,
        fetching: false
      });
    default:
      return state;
  }
};