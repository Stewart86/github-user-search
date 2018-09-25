import React, { Component } from "react";
import axios from "axios";

import { IconButton, ListItem, ListItemText, Avatar, Divider } from "@material-ui/core";

import InfoIcon from "@material-ui/icons/InfoRounded";

class UserList extends Component {
  state = {
    followers: "loading...",
    following: "loading..."
  };

  componentDidMount() {
    var encodedId = sessionStorage.getItem("github-auth");

    axios
      .get(`https://api.github.com/users/${this.props.userId}`, {
        headers: {
          Authorization: `Basic ${encodedId}`
        }
      })
      .then(response => {
        this.setState({
          followers: response.data.followers,
          following: response.data.following
        });
      })
      .catch(error => {
        this.setState({
          followers: error.message,
          following: error.message
        });
      });
  }

  render() {
    const { avatar, userId, primary } = this.props;
    return (
      <React.Fragment>
        <ListItem>
          <Avatar alt={userId} src={avatar} />
          <ListItemText
            primary={primary}
            secondary={`Followers: ${this.state.followers} | Following: ${
              this.state.following
            }`}
          />
          <IconButton
            variant={"flat"}
            size={"small"}
            color={"default"}
            onClick={() => console.log("clicked")}
          >
            <InfoIcon color={"primary"} />
          </IconButton>
        </ListItem>
        <Divider/>
      </React.Fragment>
    );
  }
}

export default UserList;
