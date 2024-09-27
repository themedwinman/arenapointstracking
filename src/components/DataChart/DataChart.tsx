import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { ChartConfiguration } from "chart.js";

const DataChart = (props: ChartConfiguration) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

Chart.register(...registerables);

export default DataChart;