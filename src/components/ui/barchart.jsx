import { useEffect } from "react";
import { Chart, registerables } from "chart.js";

// Register Chart.js plugins
Chart.register(...registerables);
Chart.defaults.datasets.bar.maxBarThickness = 80;

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
          display: true,
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage",
            },

            max: 100,
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
    <div style={{ width: "200px", height: "200px" }}>
      <canvas id="successChart"></canvas>
    </div>
  );
};

export default BarChart;
