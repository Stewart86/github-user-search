import React from "react";
import {Typography} from "@material-ui/core";

export default (props) => {
  const { page, current, max } = props;
  return (
    <Typography variant={"caption"}>
      {page === 1 ? `` : `${current} of ${max > 100 ? 100 : max} pages`}
    </Typography>
  );
};
