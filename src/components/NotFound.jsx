import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

import { Typography, Button } from "@material-ui/core";

export default () => {
  return (
    <div>
      <NavBar />
      <Typography align={"center"} paragraph variant={"display3"}>
        Opps... 404 not found! <br />
        <Typography variant={"title"}>
          The page you are looking for does not exist. <br />
          This is not part of the requirement to have this page you have
          entered! Click the button to return to homepage.
        </Typography>
      </Typography>
      <div style={{ textAlign: "center" }}>
        <Button
          variant={"raised"}
          color={"secondary"}
          component={Link}
          to={"/"}
        >
          home page
        </Button>
      </div>
    </div>
  );
};
