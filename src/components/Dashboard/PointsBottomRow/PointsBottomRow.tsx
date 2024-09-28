import React, { useEffect, useState } from 'react';
import DataChart from "@/components/DataChart";
import { Paper, useTheme, Grid } from "@mui/material";
import scss from "./PointsBottomRow.module.scss";
import { Chart } from "chart.js";

const PointsBottomRow = () => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const font = "Roboto";

  // State variables to store points data
  interface ChartData {
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  }

  const [totalPoints, setTotalPoints] = useState<ChartData>({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });
  const [pointsGained, setPointsGained] = useState<ChartData>({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });
  const [pointsLost, setPointsLost] = useState<ChartData>({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });

  const [chartKey, setChartKey] = useState(0); // State variable to trigger re-render

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch house data
        const houseResponse = await fetch('/api/getHouses');
        const houses = await houseResponse.json();
        // console.log('Houses Client-Side:', houses);
  
        // Fetch points data
        const pointsResponse = await fetch('/api/getPoints');
        const points = await pointsResponse.json();
        // console.log('Points Client-Side:', points);
  
        const housesData = Array.isArray(houses) ? houses : houses.houses;
        const pointsData = Array.isArray(points) ? points : points.points;
  
        if (!Array.isArray(housesData) || !Array.isArray(pointsData)) {
          console.error('Invalid data format:', housesData, pointsData);
          return;
        }
  
        const houseNames = housesData.map((house) => house.houseName || 'Unknown House');
        const houseColors = housesData.map((house) => house.houseColour || '#FFFFFF');
  
        const totalPointsData = houseNames.map((name) => {
          const housePoints = pointsData.filter((point) => point.associatedHouse === name);
          return housePoints.reduce(
            (acc, point) => acc + (point.pointsGained || 0) - (point.pointsLost || 0),
            0
          );
        });
  
        const pointsGainedData = houseNames.map((name) => {
          const housePoints = pointsData.filter((point) => point.associatedHouse === name);
          return housePoints.reduce((acc, point) => acc + (point.pointsGained || 0), 0);
        });
  
        const pointsLostData = houseNames.map((name) => {
          const housePoints = pointsData.filter((point) => point.associatedHouse === name);
          return housePoints.reduce((acc, point) => acc + (point.pointsLost || 0), 0);
        });
  
        setTotalPoints({
          labels: houseNames,
          datasets: [{ data: totalPointsData, backgroundColor: houseColors }],
        });
        setPointsGained({
          labels: houseNames,
          datasets: [{ data: pointsGainedData, backgroundColor: houseColors }],
        });
        setPointsLost({
          labels: houseNames,
          datasets: [{ data: pointsLostData, backgroundColor: houseColors }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    // Set the default color for all charts
    Chart.defaults.color = textColor;
    Chart.defaults.font.family = font; // Set the font for the chart
  
    // Trigger re-render by updating the state variable
    setChartKey((prevKey) => prevKey + 1);
  }, [textColor]);

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
        borderColor: "#777",
      },
    },
  };

  return (
    <Grid container className={scss.bottomRow}>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Total Points Distribution</p>
          <DataChart key={chartKey} type={"doughnut"} data={totalPoints} options={doughnutChartOptions} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Gained Points Distribution</p>
          <DataChart key={chartKey} type={"doughnut"} data={pointsGained} options={doughnutChartOptions} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Lost Points Distribution</p>
          <DataChart key={chartKey} type={"doughnut"} data={pointsLost} options={doughnutChartOptions} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PointsBottomRow;
