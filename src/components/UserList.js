import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import {
  ListItem,
  ListItemText,
  Avatar,
  Divider
} from "@material-ui/core";

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
        <ListItem button component={Link}
            to={`/user/${userId}`}>
          <Avatar alt={userId} src={avatar} />
          <ListItemText
            primary={primary}
            secondary={`Followers: ${this.state.followers} | Following: ${
              this.state.following
            }`}
          />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  }
}

export default UserList;
