import React, { Component } from 'react'
import NavBar from './NavBar';
import UserProfile from './UserProfile';

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <UserProfile />
      </div>
    )
  }
}
