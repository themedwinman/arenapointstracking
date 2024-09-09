import React, { useEffect, useState } from 'react';
import DataChart from "@/components/DataChart";
import { Paper, useTheme, Grid } from "@mui/material";
import { TotalPoints, PointsGained, PointsLost } from "@/components/dataCache";
import scss from "./PointsBottomRow.module.scss";
import { Chart } from "chart.js";
import { BorderAll, BorderColor } from '@mui/icons-material';

const PointsBottomRow = () => {
  const theme = useTheme(); // Get the theme
  const textColor = theme.palette.text.primary; // Get the primary text color
  const font = "Roboto"; // Set the font for the chart

  // State variable to trigger re-render
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    // Set the default color for all charts
    Chart.defaults.color = textColor;
    Chart.defaults.font.family = font; // Set the font for the chart

    // Trigger re-render by updating the state variable
    setChartKey(prevKey => prevKey + 1);
  }, [textColor]);

  const doughnutChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
        borderColor: "#000",
      },
    },
  };

  return (
    <Grid container className={scss.bottomRow}>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Total Points Distribution</p>
          <DataChart key={chartKey} type={"doughnut"} data={TotalPoints} options={doughnutChartOptions} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Gained Points Distribution</p>
          <DataChart key={chartKey} type={"doughnut"} data={PointsGained} options={doughnutChartOptions} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Lost Points Distribution</p>
          <DataChart key={chartKey} type={"doughnut"} data={PointsLost} options={doughnutChartOptions} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PointsBottomRow;

