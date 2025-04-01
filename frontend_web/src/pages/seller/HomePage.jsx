import MainLayout from "../../layouts/seller/MainLayout"
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import DoanhThuChart from "../../components/seller/common/chart/DoanhThuChart";
import DonHangChart from "../../components/seller/common/chart/DonHangChart";
import axios from "axios";

const orders = [
    {
        id: 1,
        maDon: "000000000000",
        ngay: "30-1-2025",
        trangThai: "Chưa xác nhận",
        tong: "100.000đ",
        nguoiMua: "Tên người dùng",
    },
    {
        id: 2,
        maDon: "000000000000",
        ngay: "30-1-2025",
        trangThai: "Chưa xác nhận",
        tong: "100.000đ",
        nguoiMua: "Tên người dùng",
    },
    {
        id: 3,
        maDon: "000000000000",
        ngay: "30-1-2025",
        trangThai: "Chưa xác nhận",
        tong: "100.000đ",
        nguoiMua: "Tên người dùng",
    },
    {
        id: 4,
        maDon: "000000000000",
        ngay: "30-1-2025",
        trangThai: "Chưa xác nhận",
        tong: "100.000đ",
        nguoiMua: "Tên người dùng",
    },
    {
        id: 5,
        maDon: "000000000000",
        ngay: "30-1-2025",
        trangThai: "Chưa xác nhận",
        tong: "100.000đ",
        nguoiMua: "Tên người dùng",
    },
];

const bestSellingProducts = [
    { id: 1, name: "Rau xanh", sold: "100kg", price: "100.000đ/kg" },
    { id: 2, name: "Rau xanh", sold: "100kg", price: "100.000đ/kg" },
    { id: 3, name: "Rau xanh", sold: "100kg", price: "100.000đ/kg" },
    { id: 4, name: "Rau xanh", sold: "100kg", price: "100.000đ/kg" },
    { id: 5, name: "Rau xanh", sold: "100kg", price: "100.000đ/kg" },
];

function HomePage() {
    const [isOpenCategory, setIsOpenCategory] = useState(false); 
    const [doanhThu, setDoanhThu] = useState([]);
    const [tongDoanhThu, setTongDoanhThu] = useState([]);

    const [type, setType] = useState("Ngày");


    useEffect(() => {
        const getDoanhThu = async () => {
            try {
                const response = await axios.get(`/api/donhang/lay/doanh-thu?type=${type}`);
                console.log(response.data.data)
                setDoanhThu(response.data.data);
                setTongDoanhThu(response.data.tong)
            } catch (error) {
                console.error("Lỗi khi lấy tên cửa hàng:", error);
            }
        };

        getDoanhThu();
    }, [type]);

    useEffect(() => {
        const getDoanhThu = async () => {
            try {
                const response = await axios.get(`/api/donhang/lay/tinh-trang-don-hang`);
                console.log(response.data.data)
                setDoanhThu(response.data.data);
                setTongDoanhThu(response.data.tong)
            } catch (error) {
                console.error("Lỗi khi lấy tên cửa hàng:", error);
            }
        };

        getDoanhThu();
    }, [type]);
    
    return (
        <MainLayout>
            <div className="h-full min-w-7xl grid grid-cols-9 grid-rows-5 gap-4">
                <div className="col-start-1 col-end-7 bg-white !p-5 rounded-xl shadow-xl row-start-1 row-end-4">
                    <span className="flex justify-between">
                        <p className="font-bold text-xl text-emerald-700">Tổng doanh thu</p>
                        <div className="relative">
                        <button
                            className="w-[120px] cursor-pointer flex items-center justify-center gap-3 bg-gray-100 px-5 py-2 rounded-xl"
                            onClick={() => setIsOpenCategory(!isOpenCategory)}
                        >
                            <span>{type}</span>
                            <IoIosArrowDown className="text-2xl" />
                        </button>
                        {isOpenCategory && (
                            <div className="w-[120px] absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-2 z-50">
                                <ul>
                                    <li className="hover:bg-gray-100 p-2 cursor-pointer" 
                                        onClick={() => {
                                            setType("Ngày");  
                                            setIsOpenCategory(false);
                                        }}>
    
                                        Ngày
                                    </li>
                                    <li className="hover:bg-gray-100 p-2 cursor-pointer" 
                                        onClick={() => {
                                            setType("Tuần");  
                                            setIsOpenCategory(false);
                                        }}>
                                        Tuần
                                    </li>
                                </ul>
                            </div>
                        )}
                        </div>
                    </span>
                    <p className="font-black !mt-1 text-3xl">{tongDoanhThu?.toLocaleString() || 0} đ</p>
                    {doanhThu && <DoanhThuChart doanhThu={doanhThu} />}
                </div>

                <div className="col-start-7 col-end-10 bg-white !p-5 rounded-xl shadow-xl row-start-1 row-end-3">
                    <p className="font-bold text-xl text-emerald-700">Sản phẩm bán chạy</p>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto mt-2">
                        {bestSellingProducts.map((product) => (
                        <div key={product.id} className="flex items-center p-2 bg-gray-100 rounded-lg">
                            <span className="w-6 h-6 flex items-center justify-center bg-green-500 text-white text-sm font-bold rounded-full">
                                {product.id}
                            </span>
                            <div className="flex-1 ml-3">
                                <p className="text-sm font-medium">{product.name}</p>
                                <p className="text-xs text-gray-500">Đã bán {product.sold}</p>
                            </div>
                            <p className="text-sm font-medium">{product.price}</p>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="col-start-1 col-end-7 bg-white !p-5 rounded-xl shadow-xl row-start-4 row-end-6">
                    <p className="font-bold text-xl text-emerald-700">Đơn hàng mới</p>
                    <div className="mt-1 overflow-y-auto max-h-[200px]">
                        <table className="min-w-full border rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Mã đơn</th>
                            <th className="p-2 border">Ngày</th>
                            <th className="p-2 border">Trạng thái</th>
                            <th className="p-2 border">Tổng</th>
                            <th className="p-2 border">Người mua</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                            <tr key={order.id} className="text-center border">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{order.maDon}</td>
                                <td className="p-2 border">{order.ngay}</td>
                                <td className="p-2 border">
                                <span
                                    className={`px-2 py-1 border rounded-full text-sm text-red-600 border-red-400`}
                                >
                                    {order.trangThai}
                                </span>
                                </td>
                                <td className="p-2 border">{order.tong}</td>
                                <td className="p-2 border">{order.nguoiMua}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-start-7 col-end-10 bg-white !p-5 rounded-xl shadow-xl row-start-3 row-end-6">
                    <p className="font-bold text-xl text-emerald-700">Tình trạng đơn hàng</p>
                    <DonHangChart />
                </div>
            </div>
        </MainLayout>
    )
}

export default HomePage