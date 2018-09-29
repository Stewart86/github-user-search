import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import { CheckAuth } from "../actions/userActions";

class LoginDialog extends Component {
  static propTypes = {
    CheckAuth: PropTypes.func.isRequired
  };
  state = {
    userId: null,
    password: null
  };

  handleUserIdChange = event => {
    this.setState({
      userId: event.target.value
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleLogin = (userId, password) => {
    this.props.CheckAuth(userId, password);
    this.props.handleClose();
  };

  render() {
    const { open, handleClose } = this.props;
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login to GitHub</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your GitHub Username and Password here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User Name"
              type="text"
              onChange={this.handleUserIdChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              onChange={this.handlePasswordChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() =>
                this.handleLogin(this.state.userId, this.state.password)
              }
              color="primary"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    CheckAuth: (userId, password) => dispatch(CheckAuth(userId, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDialog);
