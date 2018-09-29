import { GetPagination } from "../helper/GetPagination";
const initialState = {
  user: {
    items: []
  },
  pagination: [],
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
      var paginationNumList = GetPagination(action.payload.total_count);

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
