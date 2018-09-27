import React, { Component } from 'react'
import SearchBox from './SearchBox';
import NavBar from './NavBar';

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <SearchBox/>
      </div>
    )
  }
}
