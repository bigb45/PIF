import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

// Register Chart.js plugins
Chart.register(...registerables);
Chart.defaults.datasets.bar.maxBarThickness = 80;

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Check if the chart instance exists
    if (chartRef.current) {
      // Update the chart's data
      chartRef.current.data = data;
      console.log("data updated ", data);
      // Update the chart
      chartRef.current.update();
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the existing chart
      chartRef.current.destroy();
    }
    // Get the canvas element
    const ctx = document.getElementById("successChart").getContext("2d");

    // Create the chart
    const chartInstance = new Chart(ctx, {
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
          },
        },
      },
    });

    // Store the chart instance in the ref
    chartRef.current = chartInstance;
  }, [data]);

  return (
    <div style={{ width: "200px", height: "200px" }}>
      <canvas id="successChart"></canvas>
    </div>
  );
};

export default BarChart;
