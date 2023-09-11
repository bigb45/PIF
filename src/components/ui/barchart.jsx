import { useEffect } from "react";
import { Chart, registerables } from "chart.js";

// Register Chart.js plugins
Chart.register(...registerables);
Chart.defaults.datasets.bar.maxBarThickness = 100;

const BarChart = ({ data }) => {
  useEffect(() => {
    // Get the canvas element
    const ctx = document.getElementById("successChart").getContext("2d");

    // Create the chart
    new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        legend: {
          display: false,
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            position: "right",
            // Place y-axis labels to the right of bars
          },
        },
      },
    });
  }, [data]);

  return (
    <div style={{ width: "600px" }}>
      <canvas id="successChart"></canvas>
    </div>
  );
};

export default BarChart;
