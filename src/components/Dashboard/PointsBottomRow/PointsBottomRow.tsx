import Grid from "@mui/material/Grid";
import React from "react";
import DataChart from "@/components/DataChart";
import { Paper } from "@mui/material";
import { TotalPoints, PointsGained, PointsLost } from "@/components/mockData";
import scss from "./PointsBottomRow.module.scss";


const PointsBottomRow = () => {
    return (
        <Grid container className={scss.bottomRow}>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Total Points Distribution</p>
                    <DataChart type={"doughnut"} data={TotalPoints} />
                </Paper>
            </Grid>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Gained Points Distribution</p>
                    <DataChart type={"doughnut"} data={PointsGained} />
                </Paper>
            </Grid>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Lost Points Distribution</p>
                    <DataChart type={"doughnut"} data={PointsLost} />
                </Paper>
            </Grid>


        </Grid>
    )


};

export default PointsBottomRow;
