import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { darkOptions } from "./Themes";
import { houses } from "@/helper/Util";
import { ChartConfiguration } from "chart.js";

const DataChart = (props: ChartConfiguration) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  const labels = houses({ count: 4 });
  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
          // ...darkOptions,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data]);
  return <canvas ref={chartRef} />;
};
Chart.register(...registerables);

export default DataChart;