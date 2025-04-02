import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ padding: '7px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
        <p className="label" style={{ marginBottom: '5px' }}>{label}</p>
        <p style={{ color: '#2A7534' }}>Số sản phẩm: <span>{payload[0]?.value}</span></p>
        <p style={{ color: '#25674F' }}>Tổng lượt xem: <span>{payload[1]?.value}</span></p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,  
    })
  ),
  label: PropTypes.string,
};

const AreaChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/sanpham/view-category");
        const formattedData = response.data.data.map(item => ({
          name: item._id, // Tên danh mục
          soSanPham: item.soSanPham || 0, // Số lượng sản phẩm
          tongLuotXem: item.tongLuotXem || 0, // Tổng lượt xem
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width={1200} height={300}>
      <AreaChart data={chartData}>
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />

      
        <Area
          type="monotone"
          dataKey="soSanPham"
          stroke="#FF7300"
          fill="#FFBB28"
        />

     
        <Area
          type="monotone"
          dataKey="tongLuotXem"
          stroke="#27A673"
          fill="#9ECAA3"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
