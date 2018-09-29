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
  Button,
  Divider,
  LinearProgress,
  CircularProgress
} from "@material-ui/core";

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
    padding: 30,
    borderRadius: "25px"
  },
  nameButton: {
    width: "100%",
    padding: 15,
    margin: 5
  },
  gridPadding: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

class UserProfile extends Component {
  static propTypes = {
    GetUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    followers: PropTypes.array.isRequired,
    GetUserFollowing: PropTypes.func.isRequired,
    GetUserFollowers: PropTypes.func.isRequired,
    GetUserRepos: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    followerLoading: PropTypes.bool.isRequired,
    followingLoading: PropTypes.bool.isRequired,
    reposLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.GetUser(this.props.match.params.id);
    this.props.GetUserFollowers(this.props.match.params.id);
    this.props.GetUserFollowing(this.props.match.params.id);
    this.props.GetUserRepos(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
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
      userId,
      followerLoading,
      followingLoading,
      reposLoading
    } = this.props;

    return (
      <React.Fragment>
        <Grid container>
          <Grid item sm={false} lg={1} />
          <Grid className={classes.gridPadding} item sm={3} lg={3}>
            {/* Avatar / profile / repos */}
            <Card>
              <CardMedia
                className={classes.media}
                component={"img"}
                image={avatar}
                alt={`${user} Profile Photo`}
                title={user}
              />
              <CardContent>
                <Button
                  variant={"raised"}
                  className={classes.nameButton}
                  color={"secondary"}
                  size={"medium"}
                  href={url}
                  style={{ textAlign: "center" }}
                >
                  {user} ({userId})
                </Button>
                <Typography className={classes.titleText} variant={"title"}>
                  Bio:
                  <Typography className={classes.text} variant={"caption"}>
                    {bio ? bio : "None"}
                  </Typography>
                  Company:
                  <Typography className={classes.text} variant={"caption"}>
                    {company ? company : "None"}
                  </Typography>
                  Email:
                </Typography>
                <Typography
                  className={classes.text}
                  variant={"caption"}
                  style={{ paddingBottom: 30 }}
                >
                  {email ? email : "None"}
                </Typography>
                <Divider />
                <Typography variant={"title"} style={{ padding: 5 }}>
                  Repositories
                </Typography>
                <List>
                  {reposLoading ? (
                    <CircularProgress />
                  ) : (
                    repos.map(el => (
                      <ReposList
                        key={el.id}
                        name={el.name}
                        repoUrl={el.html_url}
                        description={el.description}
                        lastUpdated={new Date(el.updated_at).toLocaleDateString(
                          "en-uk"
                        )}
                      />
                    ))
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          {/* Avatar / profile / repos ends */}

          {/* grid for both followers and following*/}
          <Grid item sm={9} lg={7}>
            <Grid container>
              {/* Followers nested grid here*/}
              <Grid className={classes.gridPadding} item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="display1" component="h2">
                      Followers
                    </Typography>
                    <List>
                      {followerLoading ? (
                        <LinearProgress />
                      ) : (
                        followers.map(el => (
                          <UserList
                            key={el.id}
                            avatar={el.avatar_url}
                            userId={el.login}
                          />
                        ))
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Following nested grid here*/}
              <Grid className={classes.gridPadding} item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="display1" component="h2">
                      Following
                    </Typography>
                    <List>
                      {followingLoading ? (
                        <LinearProgress />
                      ) : (
                        following.map(el => (
                          <UserList
                            key={el.id}
                            avatar={el.avatar_url}
                            userId={el.login}
                          />
                        ))
                      )}
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
  repos: state.UserRepos.repos,
  followerLoading: state.UserFollowers.fetching,
  followingLoading: state.UserFollowing.fetching,
  reposLoading: state.UserRepos.fetching
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
