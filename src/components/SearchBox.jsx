import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  Grid,
  TextField,
  Button,
  List,
  CircularProgress,
  Paper,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { GetUserList, CheckSession, Logout } from "../actions/userActions";
import UserList from "./UserList";
import LoginDialog from "./LoginDialog";
import PageFlipper from "./PageFlipper";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  contents: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      marginRight: "auto",
      marginLeft: "auto"
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "13vw",
      paddingRight: "13vw"
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: "23vw",
      paddingRight: "23vw"
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "35vw",
      paddingRight: "35vw"
    }
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
    open: false,
    searchPadding: { paddingTop: "20vh" },
    info:
      "You are not logged in.\n To show complete search result with followers and following,\nlogin with your GitHub account."
  };

  componentDidMount() {
    this.props.CheckSession();
  }

  handleChange = event => {
    if (event.target.value === "") {
      this.setState({
        searchPadding: { paddingTop: "20vh" },
        userId: "Enter User ID here"
      });
    } else {
      this.setState({
        userId: event.target.value,
        searchPadding: { paddingTop: "" }
      });
    }
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
          {/* Main search area */}
          <Grid item sm={12}>
            {/* Button for login /  logout start*/}
            <Grid item sm={12} style={this.state.searchPadding}>
              {sessionStorage.getItem("github-auth") == null
                ? this.state.info.split("\n").map((item, key) => {
                    return (
                      <Typography key={key} variant={"caption"}>
                        {item}
                        <br />
                      </Typography>
                    );
                  })
                : ""}
              {LoginBtn === "login" || LoginBtn === "logging in.." ? (
                <Button
                  variant={"raised"}
                  color={"secondary"}
                  className={classes.button}
                  onClick={() => this.handleClickOpen()}
                >
                  {LoginBtn}
                </Button>
              ) : (
                ""
              )}
            </Grid>

            {/* Button for login /  logout end*/}
            <Grid item sm={12}>
              <TextField
                label={"Search"}
                placeholder={userId}
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            {/* Users list start */}
            <Grid item sm={12}>
              {userId === "Enter User ID here" ? (
                ""
              ) : (
                <React.Fragment>
                  <PageFlipper
                    pagination={pagination}
                    currentPage={currentPage}
                    handlePageFlip={this.handlePageFlip}
                  />
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
                            />
                          ))
                        )}
                      </List>
                    </Paper>
                  )}
                  <PageFlipper
                    pagination={pagination}
                    currentPage={currentPage}
                    handlePageFlip={this.handlePageFlip}
                  />
                </React.Fragment>
              )}
            </Grid>
          </Grid>
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
