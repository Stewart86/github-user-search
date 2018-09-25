import {perPage} from "../actions/userActions"
const initialState = {
  user: {
    items: []
  },
  pagination: 1,
  fetching: false,
  fetched: false,
  error: null
};

export const UserList = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_LIST":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_USER_LIST_SUCCESS":
      var totalCount = action.payload.total_count;
      var maxPages = totalCount / perPage;
      var zeroBasedList = Array.from(Array(Math.ceil(maxPages)).keys());
      var paginationNumList = Array.from(zeroBasedList.map(el => el + 1));
      
      return Object.assign({}, state, {
        user: action.payload,
        pagination: paginationNumList,
        fetching: false,
        fetched: true
      });
    case "GET_USER_LIST_FAILED":
      return Object.assign({}, state, {
        error: action.payload,
        fetching: false
      });
    default:
      return state;
  }
};
