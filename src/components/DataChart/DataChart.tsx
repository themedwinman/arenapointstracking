import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { ChartConfiguration } from "chart.js";


// DataChart component which renders a Chart.js chart
const DataChart = (props: ChartConfiguration) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Create a new chart if the chartRef is not null
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