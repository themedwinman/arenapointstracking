import React from "react";
import scss from "./PointsOverview.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/components/DataChart";
import { lineChartData } from "@/components/mockData";

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
          <Typography>Points Over Time</Typography>
          {/* Importing points chart to show on the dashboard */}
          <DataChart type={"line"} data={lineChartData} />
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
              <Typography>Points Removed</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography>23</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>
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