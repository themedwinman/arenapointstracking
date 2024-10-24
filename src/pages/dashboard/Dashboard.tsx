import React from 'react';
import { Box, Grid } from "@mui/material";
import scss from './Dashboard.module.scss';
import DataRibbon from '@/components/Dashboard/DataRibbon';
import PointsOverview from '@/components/Dashboard/PointsOverview';
import PointsBottomRow from '@/components/Dashboard/PointsBottomRow';
import Login from '@/components/login/Login';
import { useUser } from '@/context/UserContext';

const Dashboard: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) {
    // Show a loading indicator while the user is being fetched
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Box>
      <Grid container gap={4} marginTop={2}>
        {/* Data Ribbon - Numerical Stats */}
        <DataRibbon />
        {/* Points overview/comparison - graph - numerical cards */}
        <PointsOverview />
      </Grid>
      {/* breaking down the points into smaller charts */}
      <PointsBottomRow />
    </Box>
  );
};

export default Dashboard;