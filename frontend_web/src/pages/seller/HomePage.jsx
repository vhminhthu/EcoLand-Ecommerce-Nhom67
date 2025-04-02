import MainLayout from "../../layouts/seller/MainLayout"
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import DoanhThuChart from "../../components/seller/common/chart/DoanhThuChart";
import DonHangChart from "../../components/seller/common/chart/DonHangChart";
import axios from "axios";
import moment from "moment";

function HomePage() {
    const [isOpenCategory, setIsOpenCategory] = useState(false); 
    const [doanhThu, setDoanhThu] = useState([]);
    const [donHang, setDonHang] = useState([]);
    const [donHangCXN, setDonHangCXN] = useState([]);
    const [sanPham, setSanPham] = useState([]);

    const [tongDoanhThu, setTongDoanhThu] = useState([]);
    const [type, setType] = useState("Ngày");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [doanhThuResponse, donHangResponse, donHangCXNResponse, sanPhamResponse] = await Promise.all([
                    axios.get(`/api/donhang/lay/doanh-thu?type=${type}`),
                    axios.get(`/api/donhang/lay/tinh-trang-don-hang`),
                    axios.get(`/api/donhang/lay/don-hang-cxn`),
                    axios.get(`/api/donhang/lay/san-pham-ban-chay`)
                ]);
    
                setDoanhThu(doanhThuResponse.data.data);
                setTongDoanhThu(doanhThuResponse.data.tong);
    
                setDonHang(donHangResponse.data.data);
    
                setDonHangCXN(donHangCXNResponse.data.data);
    
                setSanPham(sanPhamResponse.data.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
    
        fetchData();
    }, [type]);
    
    
    return (
        <MainLayout>
            <div className="h-full min-w-7xl grid grid-cols-9 grid-rows-5 gap-4">
                <div className="col-start-1 col-end-7 bg-white !p-5 rounded-xl shadow-xl row-start-1 row-end-4">
                    <span className="flex justify-between">
                        <p className="font-bold text-2xl text-emerald-700">Tổng doanh thu</p>
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
                    <p className="font-bold text-2xl text-emerald-700">Sản phẩm bán chạy</p>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto mt-2">
                    {sanPham.map((product, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4">
                            <span className="w-8 h-8 flex items-center justify-center text-green-600 text-lg font-bold">
                            {index + 1}
                            </span>
                            
                            <img 
                                src={product.sanPhamInfo.dsAnhSP || "/default-image.jpg"} 
                                alt={product.sanPhamInfo.tenSP} 
                                className="w-16 h-16 object-cover rounded-md ml-3"
                            />
                            
                            <div className="flex-1 ml-4">
                            <p className="text-lg font-semibold text-gray-800">{product.sanPhamInfo.tenSP}</p>
                            <p className="text-md text-gray-500">Đã bán {product.totalSold} đơn</p>
                            </div>

                            <p className="text-md font-semibold text-gray-700">
                            {product.sanPhamInfo.phanLoai[0].giaLoai.toLocaleString()}đ/{product.sanPhamInfo.phanLoai[0].donVi}
                            </p>
                        </div>
                        ))}

                    </div>
                </div>

                <div className="col-start-1 col-end-7 bg-white !p-5 rounded-xl shadow-xl row-start-4 row-end-6">
                    <p className="font-bold text-2xl mb-3 text-emerald-700">Đơn hàng mới</p>
                    <div className="mt-1 overflow-y-auto max-h-[200px]">
                    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                        <thead className="text-gray-700">
                            <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Mã đơn</th>
                            <th className="p-3">Ngày</th>
                            <th className="p-3">Trạng thái</th>
                            <th className="p-3">Tổng</th>
                            <th className="p-3">Người mua</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donHangCXN.map((order, index) => (
                            <tr
                                key={index}
                                className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                            >
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{order.maDonHang}</td>
                                <td className="p-3">{moment(order.ngayDat).format('DD/MM/YYYY')}</td>
                                <td className="p-3">
                                    <span
                                        className="px-2 py-1 border rounded-full text-sm text-red-600 border-red-400"
                                    >
                                        {order.trangThai}
                                    </span>
                                </td>
                                <td className="p-3">{order.tongTienThanhToan.toLocaleString()}đ</td>
                                <td className="p-3">{order?.khachHangId?.tenNguoiDung || 'N/A'}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    </div>
                </div>

                <div className="col-start-7 col-end-10 bg-white !p-5 rounded-xl shadow-xl row-start-3 row-end-6">
                    <p className="font-bold text-2xl text-emerald-700">Tình trạng đơn hàng</p>
                    {donHang && <DonHangChart donHang={donHang} />}
                </div>
            </div>
        </MainLayout>
    )
}

export default HomePage