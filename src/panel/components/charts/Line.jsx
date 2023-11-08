import React, { Component } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

class Line extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        sparkline: {
          enabled: false,
        },
        tooltip: { enabled: false },
        yaxis: { show: false },
        xaxis: {
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        grid: { show: false },
        legend: { show: false },
        chart: {
          toolbar: { show: false },
        },
        colors: ["#EEE"],
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
      },
      series: [
        {
          data: this.props.series,
        },
      ],
    };
  }

  render() {
    return (
      <ChartContainer className="line-chart-container">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
        />
      </ChartContainer>
    );
  }
}

const ChartContainer = styled.section`
  display: flex;
  .apexcharts-xaxis {
    display: none;
  }
  .apexcharts-xaxis-tick {
    display: none;
  }
`;
export default Line;
