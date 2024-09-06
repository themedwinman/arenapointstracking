import { houses } from "@/helper/Util";
import { BorderColor } from "@mui/icons-material";
import { houseColours } from "@/helper/Util";

export const PointsGainedArray: Array<number> = [1000, 4000, 5000, 6000, 3000]

export const PointsLostArray: Array<number> = [200, 1200, 400, 750]

// export const TotalPointsArray: Array<number> = [PointsGainedArray[0] - PointsLostArray[0], PointsGainedArray[1] - PointsLostArray[1], PointsGainedArray[2] - PointsLostArray[2], PointsGainedArray[3] - PointsLostArray[3]]

export const TotalPointsArray = houses.map((house, index) => { return (PointsGainedArray[index]??0) - (PointsLostArray[index]??0) });

// export const LostPointsPercent: number = Math.round(TotalPointsArray.reduce((a, b) => a + b, 0)/PointsGainedArray.reduce((a, b) => a + b, 0))


// Mock data for the bar chart that is showing the total points
export const barChartData = {
  labels: houses,
  datasets: [
    {
      label: "Total House Points",
      data: TotalPointsArray,
      fill: true,
      backgroundColor: houseColours,
      tension: 1,

    },
  ],
};


// Mock data for the doughnut chart that is showing the distribution of points
export const TotalPoints = {
  labels: houses,
  datasets: [
    {
      label: "Points Distribution",
      data: TotalPointsArray,
      backgroundColor: houseColours,
      borderColor: "#666",
      borderWidth: 0.5,
      hoverOffset: 8,
    },
  ],
};

// Mock data for the doughnut chart that is showing the distribution of points gained
export const PointsGained = {
  labels: houses,
  datasets: [
    {
      label: "Points Distribution",
      data: PointsGainedArray,
      backgroundColor: houseColours,
      hoverOffset: 8,
      borderColor: "#666",
      borderWidth: 0.5
    },
  ],
};


// Mock data for the doughnut chart that is showing the distribution of points lost
export const PointsLost = {
  labels: houses,
  datasets: [
    {
      label: "Points Distribution",
      data: PointsLostArray,
      backgroundColor: houseColours,
      hoverOffset: 8,
      borderColor: "#666",
      borderWidth: 0.5
    },
  ],
};
