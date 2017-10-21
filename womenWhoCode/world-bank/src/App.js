import React, { Component } from 'react';
import SideMenu from './SideMenu.js';
import Graph from './Graph.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      country: '',
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  setCountry = text => {
    this.setState({
      country: text,
    });
  };

  getChartData() {
    // Ajax calls here
    this.setState({
      chartData: {
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets: [
          {
            label: this.state.country,
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data for a Better World</h1>
        </header>
        <div className="side-menu">
          <SideMenu setCountry={this.setCountry} />
        </div>
        <div>
          <Graph chartData={this.state.chartData} location={this.state.country} legendPosition="bottom" />
        </div>
      </div>
    );
  }
}

export default App;
