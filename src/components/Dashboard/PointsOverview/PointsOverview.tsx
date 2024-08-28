import React from "react";
import scss from "./PointsOverview.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/components/DataChart";
import { barChartData } from "@/components/mockData";
import { alignProperty } from "@mui/material/styles/cssUtils";

export type PointsOverviewType = {
  title: string;
  value: string;
  changeValue: string;
};

const PointsOverview = () => {
  const theme = useTheme();

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          {/* <Typography align="center">Total House Points</Typography> */}
          {/* Importing points chart to show on the dashboard */}
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
                  tension: barChartData.datasets[0].tension,
                },
              ],
            }}
          />
        </div>
        <div className={scss.cardWrapper}>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography>Total Points</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography>4000</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>
                12.5%
              </Typography>
            </div>
          </Card>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography>Points Gained</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography>54</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>
                Percent%
              </Typography>
            </div>
          </Card>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography>Points Lost</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography>23</Typography>
              <Typography color={theme.palette.error.main} fontSize={14}>
                Percent%
              </Typography>
            </div>
          </Card>
        </div>
      </Paper>
    </Grid>
  );
};

export default PointsOverview;