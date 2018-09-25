import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  Grid,
  TextField,
  Button,
  List,
  CircularProgress,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { GetUserList, CheckSession, Logout } from "../actions/userActions";
import UserList from "./UserList";
import LoginDialog from "./LoginDialog";
import Pagination from "./Pagination";
import PageNumbering from "./PageNumbering";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  contents: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit
  }
});

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

  handlePageFlip = page => {
    this.setState({
      currentPage: page
    });
    this.props.GetUserList(this.state.userId, page);
  };

  render() {
    const { userList, pagination, loading, LoginBtn, classes } = this.props;

    const { currentPage, userId, open } = this.state;

    return (
      <div>
        <Grid container className={classes.contents}>
          <Grid item sm />
          <Grid item sm>
            <Grid>
              <TextField
                label={"Search"}
                placeholder={userId}
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
              />
              <Button
                className={classes.button}
                onClick={() => this.handleClickOpen()}
              >
                {LoginBtn}
              </Button>
              {/* Pagination start */}
              <Pagination
                onHandlePageFlip={this.handlePageFlip}
                currentPage={currentPage}
                LastPage={pagination[pagination.length - 1]}
              />
              <PageNumbering
                page={pagination}
                current={currentPage}
                max={pagination[pagination.length - 1]}
              />
              {/* pagination ends */}
            </Grid>
            <Grid container direction={"column"}>
              {userList.length === 0 ? (
                ""
              ) : (
                <Paper>
                  <List width={400}>
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
                </Paper>
              )}
              {/* Pagination start */}
              <PageNumbering
                page={pagination}
                current={currentPage}
                max={pagination[pagination.length - 1]}
              />
              <Pagination
                onHandlePageFlip={this.handlePageFlip}
                currentPage={currentPage}
                LastPage={pagination[pagination.length - 1]}
              />
              {/* pagination ends */}
            </Grid>
          </Grid>
          <Grid item sm />
        </Grid>
        <LoginDialog open={open} handleClose={() => this.handleClose()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userList: state.UserList.user.items,
  pagination: state.UserList.pagination,
  loading: state.UserList.fetching,
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
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchBox);
