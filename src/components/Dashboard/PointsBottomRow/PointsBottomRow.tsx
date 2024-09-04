import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import DataChart from "@/components/DataChart";
import { Paper, useTheme } from "@mui/material";
import { TotalPoints, PointsGained, PointsLost } from "@/components/mockData";
import scss from "./PointsBottomRow.module.scss";
import { scales } from "chart.js";
import { Chart } from "chart.js";
import { title } from "process";




const PointsBottomRow = () => {

    const theme = useTheme(); // Get the theme
    const textColor = theme.palette.text.primary; // Get the primary text color
    const font = "Roboto"; // Set the font for the chart
    const mode = theme.palette.mode; // Get the mode of the theme
    console.log(textColor);


    useEffect(() => {
        // Set the default color for all charts
        Chart.defaults.color = textColor;
        Chart.defaults.font.family = font; // Set the font for the chart
      }, [textColor]);

      const doughnutChartOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
      };



    return (
        <Grid container className={scss.bottomRow}>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Total Points Distribution</p>
                    <DataChart type={"doughnut"} data={TotalPoints} options={doughnutChartOptions}/>
                </Paper>
            </Grid>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Gained Points Distribution</p>
                    <DataChart type={"doughnut"} data={PointsGained} options={doughnutChartOptions}/>
                </Paper>
            </Grid>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Lost Points Distribution</p>
                    <DataChart type={"doughnut"} data={PointsLost} options={doughnutChartOptions} />
                </Paper>
            </Grid>


        </Grid>
    )


};

export default PointsBottomRow;
