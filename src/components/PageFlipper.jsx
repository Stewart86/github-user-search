import React from "react";
import Pagination from "./Pagination";
import PageNumbering from "./PageNumbering";

export default (props) => {
  if (props.pagination.length > 1) {
    return (
      <React.Fragment>
        <PageNumbering
          page={props.pagination}
          current={props.currentPage}
          max={props.pagination[props.pagination.length - 1]}
        />
        <Pagination
          onHandlePageFlip={props.handlePageFlip}
          currentPage={props.currentPage}
          LastPage={props.pagination[props.pagination.length - 1]}
        />
      </React.Fragment>
    );
  }
  return "";
};