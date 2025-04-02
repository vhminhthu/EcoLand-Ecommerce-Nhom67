import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonHangChart = ({ donHang }) => {
    if (!donHang || donHang.length === 0) {
        return <p>Không có dữ liệu doanh thu</p>;

    }
console.log("đon hàng", donHang)
    const labels = donHang.map(item => item._id);
    const dataPoints = donHang.map(item => item.count);

    const backgroundColors = {
        "Chờ lấy hàng": "#f87171",
        "Hoàn thành": "#34d399", 
        "Chờ xác nhận": "#facc15",
        "Chờ giao hàng": "#38bdf8"
    };

    const hoverBackgroundColors = {
        "Chờ lấy hàng": "#ef4444", 
        "Hoàn thành": "#10b981", 
        "Chờ xác nhận": "#eab308",
        "Chờ giao hàng": "#0ea5e9"
    };

    const colors = labels.map(label => backgroundColors[label] || "#000000"); 
    const hoverColors = labels.map(label => hoverBackgroundColors[label] || "#555555");

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataPoints, 
                backgroundColor: colors, 
                hoverBackgroundColor: hoverColors,
            },
        ],
    };

    return (
        <div className="w-full max-w-sm">
            <Pie key={donHang.length} data={data} />
        </div>
    );
};

DonHangChart.propTypes = {
    donHang: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        })
    ),
};

export default DonHangChart;
