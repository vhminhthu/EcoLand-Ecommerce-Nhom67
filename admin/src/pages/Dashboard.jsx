import Navigation from "../components/Navigation";
import Header from "../components/Header";
import { CiShop } from "react-icons/ci";
import AreaChartComponent from "./other/AreaChart.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await axios.get("/api/sanpham/top-selling");
        if (res.data.success) {
          setProducts(res.data.data.slice(0, 5)); 
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };

    fetchTopSelling();
  }, []);
  
  return (
    <Navigation>
      <Header title="Dashboard" />
      <div className="!pt-16 !p-4">
        <h1 className="text-2xl font-bold">DASHBOARD</h1>

        {/* Grid chính */}
        <div className="grid grid-cols-3 gap-4 !mt-4">
          {/* Transaction */}
          <div className="bg-white !p-5 rounded-lg shadow">
            <h3 className="text-green-700 font-bold">Các đơn hàng</h3>
            <div className="flex justify-around !mt-4">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">25%</div>
                <p className="text-gray-600 text-sm">On Delivery</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">85%</div>
                <p className="text-gray-600 text-sm">Delivered</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">7%</div>
                <p className="text-gray-600 text-sm">Cancelled</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="bg-white !p-5 rounded-lg shadow">
            <h3 className="text-green-700 font-bold">Tổng quan</h3>
            <div className="flex flex-col gap-2 !mt-2">
              <p className="bg-gray-200 !px-3 !py-1 rounded font-semibold">
                3100 new users
              </p>
              <p className="bg-gray-200 !px-3 !py-1 rounded font-semibold">
                2931 products in total
              </p>
              <p className="bg-gray-200 !px-3 !py-1 rounded font-semibold">
                1432 new products this week
              </p>
            </div>
          </div>

          {/* Top Selling Items */}
          <div className="bg-white !p-5 rounded-lg shadow">
      <h3 className="text-green-700 font-bold">Top những sản phẩm bán chạy</h3>
      <div className="!mt-3 !space-y-2">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={product.dsAnhSP|| "https://via.placeholder.com/40"}
                  alt={product.tenSP}
                  className="!w-10 !h-10 rounded-full"
                />
                <p className="text-gray-800 font-medium">{product.tenSP}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <CiShop size={20} />
                <span>{product.idCH?.tenCH || "Unknown Shop"}</span>
              </div>
            </div>                           
          ))
        ) : (
          <p className="text-gray-500 text-sm">No top-selling items found.</p>
        )}
      </div>
    </div>
        </div>

        {/* Biểu đồ cột */}
        <div className="bg-white !p-6 !mt-4 rounded-lg shadow text-center text-xl text-gray-700">
          <AreaChartComponent/>
        </div>
      </div>
    </Navigation>
  );
};



export default Dashboard;
