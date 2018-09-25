import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";


export default class NavBar extends Component {
  render() {
    return (
      <div>
        <AppBar position={"fixed"} color={"primary"}>
        <Toolbar>
            <Typography variant={"title"} color={"inherit"}>
            Enter GitHub username to start searching.
            </Typography>
        </Toolbar>
        </AppBar>
        <div style={{ paddingTop: 68 }} />

      </div>
    );
  }
}
