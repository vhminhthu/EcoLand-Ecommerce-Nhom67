import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonHangChart = () => {
    const data = {
        labels: ["Đã hủy", "Chờ xác nhận", "Đang giao", "Hoàn thành"],
        datasets: [
        {
            data: [5, 10, 15, 20], // Số lượng đơn hàng
            backgroundColor: ["#f87171", "#facc15", "#38bdf8", "#34d399"],
            hoverBackgroundColor: ["#ef4444", "#eab308", "#0ea5e9", "#10b981"],
        },
        ],
    };

    return (
        <div className="w-full max-w-sm">
            <Pie data={data} />
        </div>
    );
};

export default DonHangChart;
