import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LineChart({ labels, trainData, valData, title }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#cbd5e1", // slate-300
          font: { family: "inherit" },
        },
      },
      title: {
        display: true,
        text: title,
        color: "#f8fafc", // slate-50
        font: { size: 16, weight: "bold", family: "inherit" },
        padding: 20,
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "#94a3b8" }, // slate-400
      },
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "#94a3b8" },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Training",
        data: trainData,
        borderColor: "rgb(168, 85, 247)", // purple-500
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Validation",
        data: valData,
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
