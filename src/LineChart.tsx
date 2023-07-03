import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

interface Data {
  x: string;
  y: number;
}

interface ChartData {
  label: string;
  data: Data[];
  color: string;
}

interface LineChartProps {
  data: ChartData[];
  id: string; // Add this line
}

const LineChart: React.FC<LineChartProps> = ({ data, id }) => { // Add id here
  const chartRef = useRef<Chart>();

  useEffect(() => {
    if (data.some(chartData => !chartData.data.length)) return;

    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy previous chart
    }

    const ctx = document.getElementById(id) as HTMLCanvasElement; // Use id here
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data[0].data.map(({ x }) => x),
        datasets: data.map(chartData => ({
          label: chartData.label,
          data: chartData.data.map(({ y }) => y),
          fill: false,
          backgroundColor: chartData.color,
          borderColor: chartData.color,
          tension: 0.1,
        })),
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Frequency',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
  }, [data, id]); // Add id as a dependency

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <canvas id={id} /> {/* Use id here */}
    </div>
  );
};

export default LineChart;
