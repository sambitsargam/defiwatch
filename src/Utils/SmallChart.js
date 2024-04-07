import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const SmallChart = ({
  series,
  color,
  width = 150,
  height = 40,
  strokeWidth = 5,
}) => {
  const [options] = useState({
    chart: {
      type: 'line',
      width: width,
      height: height,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: strokeWidth,
      dashArray: 0,
    },
    colors: [color],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return '';
          },
        },
      },
      marker: {
        show: false,
      },
    },
  });

  return (
    <Chart options={options} series={series} width={width} height={height} />
  );
};

export default SmallChart;
