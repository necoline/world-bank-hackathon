import React, { Component } from 'react';
import logo from './logo.svg';
import SideMenu from './SideMenu.js';
import Graph from './Graph.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data for a Better World</h1>
        </header>
        <div className="side-menu">
          <SideMenu />
        </div>
        <div>
          <Graph />
        </div>
      </div>
    );
  }
}

export default App;
