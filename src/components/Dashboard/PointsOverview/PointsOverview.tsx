import React, { useEffect, useState } from "react";
import scss from "./PointsOverview.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/components/DataChart";
import { Chart } from "chart.js";

export type PointsOverviewType = {
  title: string;
  value: string;
  changeValue: string;
  color: string;
};

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string | string[]; // Allow both string and array of strings
  }[];
}

const PointsOverview = () => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const font = "Roboto";
  const mode = theme.palette.mode;
  const gridColor = mode === "dark" ? "#0f0f0f" : "rgb(151, 151, 151)";

  const [barChartData, setBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [{ label: "", data: [], fill: false, backgroundColor: "" }],
  });
  const [totalPoints, setTotalPoints] = useState<ChartData>({
    labels: [],
    datasets: [{
      data: [], backgroundColor: [],
      label: "",
      fill: false
    }],
  });
  const [pointsGained, setPointsGained] = useState<ChartData>({
    labels: [],
    datasets: [{
      data: [], backgroundColor: [],
      label: "",
      fill: false
    }],
  });
  const [pointsLost, setPointsLost] = useState<ChartData>({
    labels: [],
    datasets: [{
      data: [], backgroundColor: [],
      label: "",
      fill: false
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const houseResponse = await fetch('/api/getHouses');
        const houses = await houseResponse.json();
        console.log('Houses Client-Side:', houses);

        const pointsResponse = await fetch('/api/getPoints');
        const points = await pointsResponse.json();
        console.log('Points Client-Side:', points);

        const housesData = Array.isArray(houses) ? houses : houses.houses;
        const pointsData = Array.isArray(points) ? points : points.points;

        if (!Array.isArray(housesData) || !Array.isArray(pointsData)) {
          console.error('Invalid data format:', housesData, pointsData);
          return;
        }

        const houseNames = housesData.map((house) => house.houseName || 'Unknown House');
        const houseColors = housesData.map((house) => {
          const color = house.houseColour || '#FFFFFF'; // Default color
          return typeof color === 'string' ? color : '#FFFFFF'; // Ensure it's a string
        });

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

        setBarChartData({
          labels: houseNames,
          datasets: [
            {
              label: 'Total Points',
              data: totalPointsData,
              fill: false,
              backgroundColor: houseColors,
            }
          ],
        });

        // Update other chart states
        setTotalPoints({
          labels: houseNames,
          datasets: [{
            data: totalPointsData, backgroundColor: houseColors,
            label: "",
            fill: false
          }],
        });
        setPointsGained({
          labels: houseNames,
          datasets: [{
            data: pointsGainedData, backgroundColor: houseColors,
            label: "",
            fill: false
          }],
        });
        setPointsLost({
          labels: houseNames,
          datasets: [{
            data: pointsLostData, backgroundColor: houseColors,
            label: "",
            fill: false
          }],
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Set the default color for all charts
    Chart.defaults.color = textColor;
    Chart.defaults.font.family = font;
  }, [textColor, font]);

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <DataChart
            type={"bar"}
            data={barChartData}
            options={{
              scales: {
                x: {
                  grid: {
                    color: gridColor,
                  },
                },
                y: {
                  grid: {
                    color: gridColor,
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: 'Total Points Per House',
                  color: textColor,
                },
              },
            }}
          />
        </div>
        <div className={scss.cardWrapper}>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography variant="h5">Total Combined <br/> House Points</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography color={theme.palette.success.main}>
                {totalPoints.datasets[0].data.reduce((a, b) => a + b, 0)} Points
              </Typography>
            </div>
          </Card>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography variant="h5">Total Combined <br/> Points Gained</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography color={theme.palette.success.main}>
                {pointsGained.datasets[0].data.reduce((a, b) => a + b, 0)} Points
              </Typography>
            </div>
          </Card>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography variant="h5">Total Combined <br/>Points Lost</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography color={theme.palette.error.main}>
                {pointsLost.datasets[0].data.reduce((a, b) => a + b, 0)} Points
              </Typography>
            </div>
          </Card>
        </div>
      </Paper>
    </Grid>
  );
};

export default PointsOverview;
