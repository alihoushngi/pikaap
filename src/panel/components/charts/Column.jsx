import React, { Component } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import ReactLoading from "react-loading";

const Column = (props) => {
  const state = {
    options: {
      colors: ["#e8e8e8"],
      sparkline: {
        enabled: false,
      },
      tooltip: { enabled: true },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          rotate: -90,
          offsetY: 60,
        },
        categories: props.cats,
      },
    },
    series: [
      {
        data: props.series,
      },
    ],
  };
  return (
    <ChartContainer>
      <p>{props.chartHeader}</p>
      {props.isLoading ? (
        <ReactLoading type={"bars"} color={"white"} height={"30%"} width={"30%"} />
      ) : (
        <Chart options={state.options} series={state.series} type="bar" width={props.width} />
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.section`
  display: flex;
  flex-direction: column;

  .apexcharts-canvas {
    svg {
      @media (min-width: 576px) {
        width: 80vw !important ;
      }

      // Medium devices (tablets, 768px and up)
      @media (min-width: 768px) {
        width: 80vw !important;
      }

      // Large devices (desktops, 992px and up)
      @media (min-width: 992px) {
        width: 40vw !important;
      }
    }
  }
  p {
    font-size: 1rem;
    border-bottom: 1px solid gray;
    padding-bottom: 1rem;
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
export default Column;
