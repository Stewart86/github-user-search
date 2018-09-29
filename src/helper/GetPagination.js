import { perPage } from "./config";

export function GetPagination(totalCount) {
  var maxPages = totalCount / perPage;
  var zeroBasedList = Array.from(Array(Math.ceil(maxPages)).keys());
  var paginationNumList = Array.from(zeroBasedList.map(el => el + 1));
  return paginationNumList;
}