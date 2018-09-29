import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Icon,
  Button,
  Grid
} from "@material-ui/core";

import { Logout } from "../actions/userActions";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  home: {
    marginLeft: -12,
    marginRight: 20
  },
  loginButton: {
    marginLeft: 20
  }
};

class NavBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    LoginBtn: PropTypes.string.isRequired
  };
  handlelogout = () => {
    this.props.Logout();
  };

  render() {
    const { LoginBtn, classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position={"fixed"} color={"primary"}>
          <Toolbar>
            <Grid item sm={false} lg={1} />
            <IconButton
              button={"true"}
              component={Link}
              to={"/"}
              className={classes.home}
            >
              <Icon>home</Icon>
            </IconButton>
            <Typography
              variant={"title"}
              color={"inherit"}
              className={classes.grow}
            >
              GitHub User Search
            </Typography>
            {LoginBtn === "logout" ? (
              <Button
                className={classes.loginButton}
                variant={"flat"}
                color={"inherit"}
                onClick={() => this.handlelogout()}
              >
                {LoginBtn}
              </Button>
            ) : (
              ""
            )}
            <Grid item sm={false} lg={1} />
          </Toolbar>
        </AppBar>
        <div style={{ paddingTop: 88 }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  LoginBtn: state.Auth.LoginButton
});

const mapDispatchToProps = dispatch => {
  return {
    Logout: () => dispatch(Logout())
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NavBar);
