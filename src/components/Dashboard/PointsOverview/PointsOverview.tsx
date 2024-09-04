import React, { useEffect } from "react";
import scss from "./PointsOverview.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/components/DataChart";
import { barChartData, PointsGainedArray, TotalPointsArray } from "@/components/mockData";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { LostPointsPercent } from "@/components/mockData";
import { PointsLostArray } from "@/components/mockData";
import { Chart } from "chart.js";

export type PointsOverviewType = {
  title: string;
  value: string;
  changeValue: string;
  color: string;
};
  
  const PointsOverview = () => {
    const theme = useTheme(); // Get the theme
    const textColor = theme.palette.text.primary; // Get the primary text color
    const font = "Roboto"; // Set the font for the chart
    const mode = theme.palette.mode; // Get the mode of the theme
    const gridColor = mode === "dark" ? "#0f0f0f" : "rgb(151, 151, 151)"; // Set the grid color for the chart
  
    useEffect(() => {
      // Set the default color for all charts
      Chart.defaults.color = textColor;
      Chart.defaults.font.family = font; // Set the font for the chart
    }, [textColor]);
  
    return (
      <Grid container gap={2} className={scss.wrapper}>
        <Paper className={scss.transactions}>
          <div className={scss.chart}>
            <DataChart
              type={"bar"}
              data={{
                labels: barChartData.labels,
                datasets: [
                  {
                    label: barChartData.datasets[0].label,
                    data: barChartData.datasets[0].data,
                    fill: barChartData.datasets[0].fill,
                    backgroundColor: barChartData.datasets[0].backgroundColor,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    ticks: {
                      color: textColor, // Set the text color for x-axis  
                    },
                    grid: {
                      color: gridColor, // Set the text color for x-axis grid
                    }
                  },
                  y: {
                    ticks: {
                      color: textColor, // Set the text color for y-axis
                    },
                    grid: {
                      color: gridColor, // Set the text color for y-axis grid
                    }
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Total Points Per House',
                    color: textColor, // Set the text color for title
                  },
                },
              }}
            />
          </div>
          <div className={scss.cardWrapper}>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography>Total Points</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography color={theme.palette.success.main}>{TotalPointsArray.reduce((a, b) => a + b, 0)} Points</Typography>
            </div>
          </Card>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography>Points Gained</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography color={theme.palette.success.main}>{PointsGainedArray.reduce((a, b) => a + b, 0)} Points</Typography>
            </div>
          </Card>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography>Points Lost</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography color={theme.palette.error.main}>{PointsLostArray.reduce((a, b) => a + b, 0)} Points</Typography>
            </div>
          </Card>
        </div>
        </Paper>
      </Grid>
    );
  };
  
export default PointsOverview;