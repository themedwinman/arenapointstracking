import { months } from "@/helper/Util";


// Mock data for the dashboard graph that is showing data over time
export const lineChartData = {
  labels: months({ count: 12 }),
  datasets: [
    {
      label: "Points over time",
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};


// Mock data for the doughnut chart that is showing the distribution of points
export const doughnutChartData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Points Distribution",
      data: [300, 50, 100],
      backgroundColor: ["rgb(255,137,168)", "rgb(178,3,106)", "rgb(165,7,42)"],
      hoverOffset: 4,
    },
  ],
};