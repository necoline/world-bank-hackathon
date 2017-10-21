import React, { Component } from 'react';
import './App.css';

class SideMenu extends Component {
  render() {
    return (
      <div>
        <div className="menu-title">Countries</div>
        <div className="menu-sub-title">country name</div>
        <div className="menu-title">Topic</div>
        <div className="menu-sub-title">topic name</div>
      </div>
    );
  }
}

export default SideMenu;
