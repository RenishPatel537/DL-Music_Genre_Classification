import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Title,
  Legend
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

ChartJS.register(
  CategoryScale,
  Tooltip,
  Title,
  Legend,
  MatrixController,
  MatrixElement
);

export default function ConfusionMatrix({ title, labels, matrix }) {
  // Compute max value for color scaling
  const maxVal = Math.max(...matrix.flat());

  // Convert 2D array to chartjs-matrix format
  const dataPoints = [];
  for (let actualIdx = 0; actualIdx < matrix.length; actualIdx++) {
    for (let predIdx = 0; predIdx < matrix[actualIdx].length; predIdx++) {
      dataPoints.push({
        x: labels[predIdx], // Predicted
        y: labels[actualIdx],  // Actual
        v: matrix[actualIdx][predIdx]
      });
    }
  }

  const data = {
    datasets: [
      {
        label: 'Confusion Matrix',
        data: dataPoints,
        backgroundColor(context) {
          const value = context.dataset.data[context.dataIndex]?.v;
          if (typeof value === 'undefined' || value === 0) {
            return 'rgba(128, 90, 213, 0.05)'; // Very faint purple for 0
          }
          // Scale alpha from 0.1 to 1.0 based on value
          const alpha = 0.1 + (value / maxVal) * 0.9;
          return `rgba(168, 85, 247, ${alpha})`; // Purple gradient
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        width: ({ chart }) => (chart.chartArea || {}).width / labels.length - 1,
        height: ({ chart }) => (chart.chartArea || {}).height / labels.length - 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: !!title,
        text: title,
        color: '#fff',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          title: () => null,
          label: (context) => {
            const v = context.raw.v;
            return `Actual: ${context.raw.y}, Predicted: ${context.raw.x}, Count: ${v}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        labels: labels,
        title: {
          display: true,
          text: 'Predicted Label',
          color: '#cbd5e1'
        },
        ticks: { color: '#94a3b8' },
        grid: { display: false }
      },
      y: {
        type: 'category',
        labels: labels,
        reverse: true, // Puts actual class [0] at the top
        title: {
          display: true,
          text: 'Actual Label',
          color: '#cbd5e1'
        },
        ticks: { color: '#94a3b8' },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-2">
      <Chart type="matrix" data={data} options={options} />
    </div>
  );
}
