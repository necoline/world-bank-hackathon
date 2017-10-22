import React, { Component } from 'react';
import './App.css';
import { Bar, Line } from 'react-chartjs-2';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City',
  };

  render() {
    return (
      <div className="graph">

        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'GDP In ' + this.props.location,
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />

        <Bar
          data={this.props.infantChartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'Infant Mortality Rate In ' + this.props.location,
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />

      </div>
    );
  }
}

export default Graph;
