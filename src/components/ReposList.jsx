import React, { Component } from "react";

import { ListItem, Divider, Typography, Grid } from "@material-ui/core";

class UserList extends Component {
  render() {
    const { name, repoUrl, description, lastUpdated } = this.props;
    return (
      <React.Fragment>
        <Grid
          container
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <ListItem button component={"a"} href={repoUrl} >
            <Typography  variant={"headline"}>
              {name}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant={"body1"}>{description}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant={"caption"}>{lastUpdated}</Typography>
          </ListItem>
        </Grid>
        <Divider />
      </React.Fragment>
    );
  }
}

export default UserList;
