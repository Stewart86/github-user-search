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
          <ListItem button component={"a"} href={repoUrl}>
            <Typography
              style={{ width: "100%" }}
              variant={"headline"}
              gutterBottom
            >
              {name}
              <Typography variant={"body1"}>
                {description}
                <Typography variant={"caption"} align={"right"}>
                  last updated: {lastUpdated}
                </Typography>
              </Typography>
            </Typography>
          </ListItem>
        </Grid>
        <Divider />
      </React.Fragment>
    );
  }
}

export default UserList;
