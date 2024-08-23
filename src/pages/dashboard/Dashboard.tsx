import React from 'react';
import {Box, Grid, Paper} from "@mui/material";
import scss from './Dashboard.module.scss';
import DataRibbon from '@/components/Dashboard/DataRibbon';
import PointsOverview from '@/components/Dashboard/PointsOverview';

const Dashboard = () => {
    return (
        <Box>
            {/* Data Ribbon - Numerical Stats*/}
            <DataRibbon />
            {/* Points overview/comparison - graph - numerical cards */}
            <PointsOverview />
            {/* breaking down the points into smaller charts */}
        </Box>
    )
}
export default Dashboard;