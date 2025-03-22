import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const DoanhThuChart = () => {
    const data = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
        datasets: [
        {
            label: "Dataset",
            data: [-100, -80, -40, -60, 80, -90],
            borderColor: "#ff6384",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            pointBorderColor: "#ff6384",
            pointBackgroundColor: "#fff",
            pointRadius: 6,
            pointHoverRadius: 8,
        },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            display: true,
            position: "top",
        },
        },
    };

    return (
        <div className="w-full h-[325px]">
            <Line data={data} options={options} />
        </div>
    );
};

export default DoanhThuChart;
