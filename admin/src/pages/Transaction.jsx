import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import moment from 'moment';

function Transaction() {
    const [admin, setAdmin] = useState([]);
    const [dsYeuCau, setDsYeuCau] = useState([]);
    const [dsGiaoDich, setDsGiaoDich] = useState([]);
    const [activeTab, setActiveTab] = useState("Yêu cầu");

    useEffect(() => {
        fetchDsYeuCau();
        fetchDsGiaoDich();
        fetchAdmin();
    }, []);

    const fetchAdmin = async () => {
        try {
            const response = await axios.get("/api/admin/getme");
            setAdmin(response.data);
        } catch (error) {
            console.error("Lỗi khi tải yêu cầu rút tiền:", error);
        }
    };

    const fetchDsYeuCau = async () => {
        try {
            const response = await axios.get("/api/giaodich/lay-tatca-ruttien");
            setDsYeuCau(response.data);
        } catch (error) {
            console.error("Lỗi khi tải yêu cầu rút tiền:", error);
        }
    };

    const fetchDsGiaoDich = async () => {
        try {
            const response = await axios.get("/api/giaodich/lay-tatca-thanhtoan");
            setDsGiaoDich(response.data);
        } catch (error) {
            console.error("Lỗi khi tải giao dịch thanh toán:", error);
        }
    };

    const capNhatTrangThai = async (id, trangThai) => {
        if (!window.confirm(`Xác nhận cập nhật trạng thái thành ${trangThai}?`)) return;

        try {
            await axios.patch(`/api/giaodich/capnhat/${id}`, { trangThai: trangThai });
            alert("Cập nhật trạng thái thành công!");
            fetchDsYeuCau();
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            alert("Lỗi! Vui lòng thử lại.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navigation>
                <Header title="Quản Lý Giao Dịch" />
                <div className="container !mt-16 mx-auto !p-5">
                    {/* Tabs */}
                    <div className="flex space-x-4 !mb-5 gap-5 text-xl font-bold">
                        <button 
                            className={`w-full !py-4 rounded-lg cursor-pointer ${activeTab === "Yêu cầu" ? "bg-emerald-700 text-white" : "bg-gray-300"}`}
                            onClick={() => setActiveTab("Yêu cầu")}
                        >
                            Yêu Cầu Rút Tiền
                        </button>
                        <button 
                            className={`w-full !py-4 rounded-lg cursor-pointer ${activeTab === "Giao dịch" ? "bg-emerald-700 text-white" : "bg-gray-300"}`}
                            onClick={() => setActiveTab("Giao dịch")}
                        >
                            Giao Dịch Thanh Toán
                        </button>
                    </div>

                    {/* Nội dung tab: Yêu cầu rút tiền */}
                    {activeTab === "Yêu cầu" && (
                        <div className="bg-white !p-5 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold !mb-3 text-emerald-900">Yêu Cầu Rút Tiền</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-emerald-700 text-white">
                                        <th className="border !p-2">#</th>
                                        <th className="border !p-2">Thời gian</th>
                                        <th className="border !p-2">Người dùng</th>
                                        <th className="border !p-2">Số tiền</th>
                                        <th className="border !p-2">Ngân hàng</th>
                                        <th className="border !p-2">Số tài khoản</th>
                                        <th className="border !p-2">Chủ tài khoản</th>
                                        <th className="border !p-2">Trạng thái</th>
                                        <th className="border !p-2">Hành động</th>
                                        <th className="border !p-2">Người xử lý</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dsYeuCau.map((req, index) => (
                                        <tr key={req._id} className="border">
                                            <td className="border !p-2">{index + 1}</td>
                                            <td className="border !p-2">{moment(req?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                                            <td className="border !p-2">{req?.idNguoiDungGD?.tenNguoiDung}</td>
                                            <td className="border !p-2">{req?.soTien?.toLocaleString()} VNĐ</td>
                                            <td className="border !p-2">{req?.thongTinRutTien.tenNganHang}</td>
                                            <td className="border !p-2">{req?.thongTinRutTien.soTaiKhoan}</td>
                                            <td className="border !p-2">{req?.thongTinRutTien.chuTaiKhoan}</td>
                                            <td
                                                className={`font-medium text-center ${
                                                    req?.trangThai === "Đang xử lý"
                                                        ? "text-green-500"
                                                        : req?.trangThai === "Chờ xử lý"
                                                        ? "text-yellow-500"
                                                        : req?.trangThai === "Từ chối"
                                                        ? "text-red-500"
                                                        : "text-gray-800"
                                                }`}
                                            >
                                                {req?.trangThai}
                                            </td>

                                            <td className="border !p-2">
                                            {req.trangThai === "Chờ xử lý" && (
                                                <div className="flex flex-col gap-3 !p-1" >
                                                    <button 
                                                        onClick={() => capNhatTrangThai(req._id, "Đang xử lý")}
                                                        className="cursor-pointer bg-yellow-500 text-white !py-1 w-full rounded !mr-2 hover:bg-yellow-600"
                                                    >
                                                        Đang xử lý
                                                    </button>
                                                    <button 
                                                        onClick={() => capNhatTrangThai(req._id, "Từ chối")}
                                                        className="cursor-pointer bg-red-500 text-white !py-1 w-full rounded hover:bg-red-600"
                                                    >
                                                        Từ chối
                                                    </button>
                                                </div>
                                            )}
                                            {req.trangThai === "Đang xử lý" && admin?._id?.toString() === req?.nguoiXuLy?._id?.toString() && (
                                                <button 
                                                onClick={() => capNhatTrangThai(req._id, "Đã xử lý")}
                                                className="cursor-pointer bg-green-500 text-white !px-3 !py-1 rounded !mr-2 hover:bg-green-600"
                                            >
                                                Đã xử lý
                                                </button>
                                            )}
                                            </td>
                                            <td className="border !p-2">{req?.nguoiXuLy?.tenAdmin}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Nội dung tab: Giao dịch thanh toán */}
                    {activeTab === "Giao dịch" && (
                        <div className="bg-white !p-5 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold !mb-3 text-emerald-900">Giao Dịch Thanh Toán</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-emerald-700 text-white">
                                        <th className="border !p-2">#</th>
                                        <th className="border !p-2">Thời gian</th>
                                        <th className="border !p-2">Người dùng</th>
                                        <th className="border !p-2">Mã đơn hàng</th>
                                        <th className="border !p-2">Số tiền</th>
                                        <th className="border !p-2">Mã giao dịch</th>
                                        <th className="border !p-2">Trạng thái thanh toán</th>
                                        <th className="border !p-2">Loại thanh toán</th>
                                        <th className="border !p-2">Loại thẻ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dsGiaoDich.map((tran, index) => (
                                        <tr key={tran._id} className="border">
                                            <td className="border !p-2">{index + 1}</td>
                                            <td className="border !p-2">{moment(tran?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                                            <td className="border !p-2">{tran?.idNguoiDungGD?.tenNguoiDung}</td>
                                            <td className="border !p-2">{tran?.idDonHang?.maDonHang}</td>
                                            <td className="border !p-2">{tran?.soTien.toLocaleString()} VNĐ</td>
                                            <td className="border !p-2">{tran?.thongTinGiaoDich.maGiaoDich}</td>
                                            <td className="border !p-2">{tran?.thongTinGiaoDich?.trangThaiThanhToan}</td>
                                            <td className="border !p-2">{tran?.thongTinGiaoDich?.loaiThanhToan}</td>
                                            <td className="border !p-2">{tran?.thongTinGiaoDich?.loaiThe}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Navigation>
        </div>
    );
}

export default Transaction;
