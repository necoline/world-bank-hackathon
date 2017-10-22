import React, { Component } from 'react';
import SideMenu from './SideMenu.js';
import Graph from './Graph.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.setCountry = this.setCountry.bind(this);
    this.state = {
      chartData: {},
      infantChartData: {},
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
    this.setState({
      chartData: {
        labels: ['2011', '2012', '2013', '2014', '2015', '2016'],
        datasets: [
          {
            label: this.state.country,
            data: [15517, 16155, 16691, 17393, 18036, 18569],
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
      infantChartData: {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015'],
        datasets: [
          {
            label: this.state.country,
            data: [0.5, 0.4, 0.4, 0.3, 0.3, 0.2],
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
          {this.state.country.length > 1
            ? <Graph
                chartData={this.state.chartData}
                infantChartData={this.state.infantChartData}
                location={this.state.country}
                legendPosition="bottom"
              />
            : <img src="../map.svg" className="img" />}
          {/* <img src="../map.svg" className="img" />
          <Graph
            chartData={this.state.chartData}
            infantChartData={this.state.infantChartData}
            location={this.state.country}
            legendPosition="bottom"
          /> */}
        </div>
      </div>
    );
  }
}

export default App;
