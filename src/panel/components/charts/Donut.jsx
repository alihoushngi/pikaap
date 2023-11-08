import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: {
          style: {
            fontSize: "0rem",
            fontFamily: "IranSans",
            fontWeight: "100",
          },
        },
        labels: this.props.cats,
      },
      series: this.props.series,
    };
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width={400}
        />
      </div>
    );
  }
}

export default Donut;
