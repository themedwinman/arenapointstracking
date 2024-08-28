import { houses } from "@/helper/Util";


// Mock data for the bar chart that is showing the total points
export const barChartData = {
  labels: houses({ count: 4}),
  datasets: [
    {
      label: "Total House Points",
      data: [1000, 1000, 1000, 10000],
      fill: true,
      backgroundColor: ["#0000ff", "#ff0000", "#00ff00", "#ffff00"],
      tension: 1,
    },
  ],
};


// Mock data for the doughnut chart that is showing the distribution of points
export const TotalPoints = {
  labels: ["Braddock", "Cook", "Darby", "Youngman"],
  datasets: [
    {
      label: "Points Distribution",
      data: [1000, 1000, 1000, 10000],
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
      data: [1100, 1100, 1100, 11100],
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
      data: [100, 100, 100, 1100],
      backgroundColor: ["#0000ff", "#ff0000", "#00ff00", "#ffff00"],
      hoverOffset: 4,
    },
  ],
};
