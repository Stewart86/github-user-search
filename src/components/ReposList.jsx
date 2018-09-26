import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <ListItem>
            <Typography component={Link} to={repoUrl} variant={"headline"}>
              {name}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant={"body2"}>{description}</Typography>
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
