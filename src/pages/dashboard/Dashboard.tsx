import React from 'react';
import {Box, Grid} from "@mui/material";
import scss from './Dashboard.module.scss';
import DataRibbon from '@/components/Dashboard/DataRibbon';
import PointsOverview from '@/components/Dashboard/PointsOverview';
import PointsBottomRow from '@/components/Dashboard/PointsBottomRow';
import Data from './data/Data';

interface DashboardProps {
    userRole: string | null;
  }
  
  const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
    console.log('userRole in Dashboard:', userRole); // Add logging
    return (
        
        <Box>
            <p>Your role is: {userRole}</p>
            <Grid container gap={4} marginTop={2}>
            {/* Data Ribbon - Numerical Stats*/}
                <DataRibbon />
                {/* Points overview/comparison - graph - numerical cards */}
                <PointsOverview />
            </Grid>
            {/* breaking down the points into smaller charts */}
            <PointsBottomRow />
            <Data userRole={userRole} />
        </Box>
    )
}
export default Dashboard;