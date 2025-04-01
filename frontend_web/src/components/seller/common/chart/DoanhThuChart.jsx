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
import PropTypes from "prop-types";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const DoanhThuChart = ({ doanhThu }) => {
    if (!doanhThu || doanhThu.length === 0) {
        return <p>Không có dữ liệu doanh thu</p>;
    }

    const labels = doanhThu.map(item => `${item._id}`);
    const dataPoints = doanhThu.map(item => item.totalRevenue);

    const data = {
        labels,
        datasets: [
            {
                label: "Doanh thu (VNĐ)",
                data: dataPoints,
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

DoanhThuChart.propTypes = {
    doanhThu: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            totalRevenue: PropTypes.number.isRequired,
        })
    ),
};

export default DoanhThuChart;
