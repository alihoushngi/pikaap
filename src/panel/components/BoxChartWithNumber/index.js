import React from "react";
import Line from "../charts/Line";
import "./index.scss";
import ReactLoading from "react-loading";

function BoxChartWithNumber({ series, counter, name, backgroundColor, isLoading }) {
  return (
    <div
      id="box-chart-with-number-container"
      style={{
        backgroundImage: `linear-gradient(135deg, ${backgroundColor[0]} 10%, ${backgroundColor[1]} 100%)`,
      }}
    >
      <div className="row">
        <div className="col-8">
          <section>
            {isLoading ? (
              <ReactLoading type={"bars"} color={"white"} height={"30%"} width={"30%"} />
            ) : (
              <Line series={series} />
            )}
          </section>
        </div>
        <div className="col-4">
          <main>
            <p>{counter}</p>
            <h5>{name}</h5>
          </main>
        </div>
      </div>
    </div>
  );
}

export default BoxChartWithNumber;
