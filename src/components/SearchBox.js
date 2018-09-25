import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Grid,
  TextField,
  Button,
  List,
  CircularProgress
} from "@material-ui/core";

import { GetUserList, CheckSession, Logout } from "../actions/userActions";
import UserList from "./UserList";
import LoginDialog from "./LoginDialog";

class SearchBox extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
    GetUserList: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    Logout: PropTypes.func.isRequired
  };

  state = {
    userId: "Enter User ID here",
    currentPage: 1,
    open: false
  };

  componentDidMount() {
    this.props.CheckSession();
  }

  handleChange = event => {
    this.setState({ userId: event.target.value });
    this.props.GetUserList(event.target.value, this.state.currentPage);
  };

  handleClickOpen = () => {
    if (this.props.LoginBtn === "login") {
      this.setState({ open: true });
    } else {
      this.props.Logout();
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleNextPage = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
    this.props.GetUserList(this.state.userId, this.state.currentPage);
  };

  handlePreviousPage = () => {
    this.setState({
      currentPage: this.state.currentPage - 1
    });
    this.props.GetUserList(this.state.userId, this.state.currentPage);
  };

  render() {
    const { userList, pagination, loading, LoginBtn } = this.props;

    return (
      <div>
        <Grid>
          <Button onClick={this.handlePreviousPage}>Prev</Button>
          {this.state.currentPage}
          <Button onClick={this.handleNextPage}>Next</Button>
          <br />
          {pagination === 1
            ? ``
            : `${pagination[0]}-${pagination[pagination.length - 1]} pages`}
        </Grid>
        <TextField
          label={"Search"}
          placeholder={this.state.userId}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <Button onClick={() => this.handleClickOpen()}>{LoginBtn}</Button>
        <Grid>
          <List>
            {loading ? (
              <CircularProgress />
            ) : (
              userList.map(el => (
                <UserList
                  key={el.id}
                  avatar={el.avatar_url}
                  userId={el.login}
                  primary={el.login}
                  secondary={"Followers: <1234> | Following: <4321>"}
                />
              ))
            )}
          </List>
          <LoginDialog
            open={this.state.open}
            handleClose={() => this.handleClose()}
          />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userList: state.User.user.items,
  pagination: state.User.pagination,
  loading: state.User.fetching,
  LoginBtn: state.Auth.LoginButton
});

const mapDispatchToProps = dispatch => {
  return {
    GetUserList: (user, page) => {
      dispatch(GetUserList(user, page));
    },
    CheckSession: () => dispatch(CheckSession()),
    Logout: () => dispatch(Logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
