import { houses } from "@/helper/Util";

export const PointsGainedArray: Array<number> = [1000, 4000, 5000, 6000]

export const PointsLostArray: Array<number> = [200, 1200, 400, 750]

export const TotalPointsArray: Array<number> = [PointsGainedArray[0] - PointsLostArray[0], PointsGainedArray[1] - PointsLostArray[1], PointsGainedArray[2] - PointsLostArray[2], PointsGainedArray[3] - PointsLostArray[3]]

export const LostPointsPercent: number = Math.round(TotalPointsArray.reduce((a, b) => a + b, 0)/PointsGainedArray.reduce((a, b) => a + b, 0))


// Mock data for the bar chart that is showing the total points
export const barChartData = {
  labels: houses({ count: 4}),
  datasets: [
    {
      label: "Total House Points",
      data: TotalPointsArray,
      fill: true,
      backgroundColor: ["#0000ff", "#ff0000", "#00ff00", "#ffff00"],
      tension: 1,
    },
  ],
};


// Mock data for the doughnut chart that is showing the distribution of points
export const TotalPoints = {
  labels: houses({ count: 4}),
  datasets: [
    {
      label: "Points Distribution",
      data: TotalPointsArray,
      backgroundColor: ["#0000ff", "#ff0000", "#00ff00", "#ffff00"],
      hoverOffset: 4,
    },
  ],
};

// Mock data for the doughnut chart that is showing the distribution of points gained
export const PointsGained = {
  labels: ["Braddock", "Cook", "Darby", "Youngman"],
  datasets: [
    {
      label: "Points Distribution",
      data: PointsGainedArray,
      backgroundColor: ["#0000ff", "#ff0000", "#00ff00", "#ffff00"],
      hoverOffset: 4,
    },
  ],
};


// Mock data for the doughnut chart that is showing the distribution of points lost
export const PointsLost = {
  labels: ["Braddock", "Cook", "Darby", "Youngman"],
  datasets: [
    {
      label: "Points Distribution",
      data: PointsLostArray,
      backgroundColor: ["#0000ff", "#ff0000", "#00ff00", "#ffff00"],
      hoverOffset: 4,
    },
  ],
};
