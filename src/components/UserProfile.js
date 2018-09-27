import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  CardHeader,
  Button,
  Divider
} from "@material-ui/core";
import cyan from "@material-ui/core/colors/cyan";

import UserList from "./UserList";
import ReposList from "./ReposList";
import {
  GetUser,
  GetUserFollowers,
  GetUserFollowing,
  GetUserRepos
} from "../actions/userActions";

const styles = theme => ({
  titleText: {
    paddingTop: theme.spacing.unit
  },
  media: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  username: {
    padding: 5,
    backgroundColor: cyan[500]
  }
});

class UserProfile extends Component {
  static propTypes = {
    GetUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    GetUserFollowing: PropTypes.func.isRequired,
    GetUserFollowers: PropTypes.func.isRequired,
    GetUserRepos: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    userId: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.GetUser(this.props.match.params.id);
    this.props.GetUserFollowers(this.props.match.params.id);
    this.props.GetUserFollowing(this.props.match.params.id);
    this.props.GetUserRepos(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.location.pathname);
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.GetUser(nextProps.match.params.id);
      this.props.GetUserFollowers(nextProps.match.params.id);
      this.props.GetUserFollowing(nextProps.match.params.id);
      this.props.GetUserRepos(nextProps.match.params.id);
    }
  }

  render() {
    const {
      user,
      url,
      avatar,
      bio,
      company,
      email,
      classes,
      followers,
      following,
      repos,
      userId
    } = this.props;
    return (
      <React.Fragment>
        <Grid container>
          <Grid item sm={1} lg={2} />
          <Grid item sm={3} lg={2}>
            <Card>
              <CardMedia
                className={classes.media}
                component={"img"}
                image={avatar}
                title={user}
              />
              <CardContent>
                <Button size={"large"} color="primary" href={url}>
                  {user} ({userId})
                </Button>
                <Typography
                  className={classes.titleText}
                  variant={"title"}
                >
                  Bio:
                </Typography>
                <Typography className={classes.text} variant={"caption"}>
                  {bio ? bio : "None"}
                </Typography>
                <Typography
                  className={classes.titleText}
                  variant={"title"}
                >
                  Company:
                </Typography>
                <Typography className={classes.text} variant={"caption"}>
                  {company ? company : "None"}
                </Typography>
                <Typography
                  className={classes.titleText}
                  variant={"title"}
                >
                  Email:
                </Typography>
                <Typography className={classes.text} variant={"caption"} style={{ paddingBottom: 30 }}>
                  {email ? email : "None"}
                </Typography>
                <Divider />
                <Typography variant={"title"} style={{ padding: 5 }} >
                  Repositories
                </Typography>
                <List>
                  {repos.map(el => (
                    <ReposList
                      key={el.id}
                      name={el.name}
                      repoUrl={el.url}
                      description={el.description}
                      lastUpdated={el.updated_at}
                    />
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={7} lg={6}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardHeader title={"Followers"} />
                  <CardContent>
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
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardHeader title={"Followers"} />
                  <CardContent>
                    <List>
                      {following.map(el => (
                        <UserList
                          key={el.id}
                          avatar={el.avatar_url}
                          userId={el.login}
                          primary={el.login}
                          secondary={"Followers: <1234> | Following: <4321>"}
                        />
                      ))}
                    </List>
                  </CardContent>
                </Card>
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
  user: state.User.user.name,
  userId: state.User.user.login,
  url: state.User.user.html_url,
  avatar: state.User.user.avatar_url,
  bio: state.User.user.bio,
  company: state.User.user.company,
  email: state.User.user.email,
  followers: state.UserFollowers.followers,
  following: state.UserFollowing.following,
  repos: state.UserRepos.repos
});

const mapDispatchToProps = dispatch => {
  return {
    GetUser: user => dispatch(GetUser(user)),
    GetUserFollowers: user => dispatch(GetUserFollowers(user)),
    GetUserFollowing: user => dispatch(GetUserFollowing(user)),
    GetUserRepos: user => dispatch(GetUserRepos(user))
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
