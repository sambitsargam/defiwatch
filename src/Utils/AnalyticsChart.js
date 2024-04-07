import React, { useState } from "react";
import Chart from "react-apexcharts";

const AnalyticsChart = ({ title, xseries, opts }) => {
  const [options] = useState({
    stroke: {
      show: true,
      curve: "smooth",
      marker: {
        show: true,
      },
    },
    ...opts,
  });
  console.log("xseries", xseries);
  console.log("opts", opts);

  return (
    <div>
      <h4>{title}</h4>
      <Chart options={options} series={xseries} width={450} height={300} />
    </div>
  );
};

export default AnalyticsChart;
