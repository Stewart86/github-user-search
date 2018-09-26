import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import {withRouter} from "react-router-dom";

import UserList from "./UserList";
import { GetUser, GetUserFollowers } from "../actions/userActions";

const styles = theme => ({
  titleText: {
    paddingTop: theme.spacing.unit
  },
  media: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  }
});

export class UserProfile extends Component {
  static propTypes = {
    GetUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.GetUser(this.props.match.params.id);
    this.props.GetUserFollowers(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.location.pathname)
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.GetUser(nextProps.match.params.id);
    this.props.GetUserFollowers(nextProps.match.params.id);
    }
  }

  render() {
    const {
      user,
      avatar,
      bio,
      company,
      email,
      classes,
      followers
    } = this.props;
    return (
      <React.Fragment>
        <Grid container>
          <Grid item sm={2} />
          <Grid item sm={2}>
            <Card>
              <CardMedia
                className={classes.media}
                component={"img"}
                image={avatar}
                title={user}
              />
              <CardContent>
                <Typography
                  className={classes.titleText}
                  gutterBottom
                  variant="headline"
                  component="h2"
                >
                  {user}
                </Typography>

                <Typography
                  className={classes.titleText}
                  variant={"subheading"}
                >
                  Bio:
                </Typography>
                <Typography className={classes.text} variant={"body2"}>
                  {bio ? bio : "None"}
                </Typography>
                <Typography
                  className={classes.titleText}
                  variant={"subheading"}
                >
                  Company:
                </Typography>
                <Typography className={classes.text} variant={"body2"}>
                  {company}
                </Typography>
                <Typography
                  className={classes.titleText}
                  variant={"subheading"}
                >
                  Email:
                </Typography>
                <Typography className={classes.text} variant={"body2"}>
                  {email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Grid container>
              <Grid item sm={6}>
                <Paper>
                  <Typography
                    className={classes.titleText}
                    variant={"headline"}
                  >
                    Followers
                  </Typography>
                  <List>
                    {followers.map(el => (
                      <UserList
                        key={el.id}
                        avatar={el.avatar_url}
                        userId={el.login}
                        primary={el.login}
                        secondary={"Followers: <1234> | Following: <4321>"}
                      />
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid />
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User.user.login,
  avatar: state.User.user.avatar_url,
  bio: state.User.user.bio,
  company: state.User.user.company,
  email: state.User.user.email,
  followers: state.UserFollowers.followers
});

const mapDispatchToProps = dispatch => {
  return {
    GetUser: user => dispatch(GetUser(user)),
    GetUserFollowers: user => dispatch(GetUserFollowers(user))
  };
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserProfile);
