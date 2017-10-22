import React, { Component } from 'react';
import './App.css';

class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="menu-title">Countries</div>
        <div className="menu-sub-title" onClick={() => this.props.setCountry('USA')} role="button">USA</div>
        <div className="menu-sub-title" onClick={() => this.props.setCountry('India')} role="button">India</div>
      </div>
    );
  }
}

export default SideMenu;
