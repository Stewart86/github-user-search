import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Icon
} from "@material-ui/core";

import { Link } from "react-router-dom";



export default class NavBar extends Component {

  render() {
    return (
      <div>
        <AppBar position={"fixed"} color={"primary"}>
          <Toolbar>
            <IconButton button component={Link} to={"/"}>
              <Icon>home</Icon>
            </IconButton>
            <Typography
              variant={"title"}
              color={"inherit"}
              style={{ flexGrow: 1 }}
            >
              GitHub User Search
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ paddingTop: 68 }} />
      </div>
    );
  }
}
