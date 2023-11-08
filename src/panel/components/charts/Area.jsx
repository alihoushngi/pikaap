import React, { Component } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        xaxis: {
          categories: this.props.cats,
        },
      },
      series: [
        {
          name: "series-1",
          data: this.props.series,
        },
      ],
    };
  }

  render() {
    return (
      <ChartContainer>
        <p>{this.props.chartHeader}</p>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
          width={500}
        />
      </ChartContainer>
    );
  }
}

const ChartContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 2rem;
  p {
    font-size: 1rem;
    border-bottom: 1px solid gray;
    padding-bottom: 1rem;
  }
  .apexcharts-xaxis {
    display: none;
  }
  .apexcharts-xaxis-tick {
    display: none;
  }
  .apexcharts-tooltip-title {
    display: none;
  }
  .apexcharts-tooltip-text-y-label {
    display: none;
  }
  .apexcharts-tooltip {
    background-color: white;
    border: none !important;
  }
  .apexcharts-tooltip-text-y-value {
    color: black;
  }
  .apexcharts-tooltip-marker {
    display: none;
  }
`;
export default Area;
