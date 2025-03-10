import CustomerLayout from '../../layouts/customer/CustomerLayout'
import MainLayout from '../../layouts/customer/MainLayout'
import { useState, useEffect } from 'react';
import { BiSearch } from "react-icons/bi";
import PurchaseItem from '../../components/customer/common/items/PurchaseItem';
import axios from 'axios';

function PurchasePage() {
    const [selected, setSelected] = useState('Tất cả');
    const [donhang, setDonHang] = useState([]);
    const [danhGiaMoi, setDanhGiaMoi] = useState({
        soSao: 5,
        noiDung: "",
        idDonHang: "",
    });
    const [isDanhGia, setIsDanhGia] = useState(false);


    const fetchDonHang = async () => {
        try {
            const response = await axios.get(`/api/donhang/lay/theonguoidung`);
            console.log(response.data.donHangs)
            setDonHang(response.data.donHangs); 
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
        }
    };

    useEffect(() => {
        fetchDonHang();
    }, []);

    const handleClick = (trangThai) => {
        setSelected(trangThai);
    };

    // Hàm lọc đơn hàng theo trạng thái
    const getFilteredOrders = () => {
        if (selected === 'Tất cả') return donhang;
        return donhang.filter(order => order.trangThai === selected);
    };

    const donHangDaLoc = getFilteredOrders(); // Lọc đơn hàng theo trạng thái

    const capNhatTrangThai = async (id, trangThaiMoi) => {
        try {
            await axios.put(`/api/donhang/capnhat/${id}`, { trangThai: trangThaiMoi });
            fetchDonHang();
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            console.error("Chi tiết lỗi:", error.response?.data);
        }
    };

    const moDanhGia = (idDonHang) => {
        setDanhGiaMoi({
            ...danhGiaMoi,
            idDonHang: idDonHang,
        });
        setIsDanhGia(true);
    };

    const themDanhGia = async () => {
        try {
            await axios.post(`/api/danhgia/them`, {
                soSao: danhGiaMoi.soSao,
                noiDung: danhGiaMoi.noiDung,
                idDonHang: danhGiaMoi.idDonHang,
            });
            fetchDonHang();
            setDanhGiaMoi({ soSao: 5, noiDung: "", idDonHang: "" });
            setIsDanhGia(false);
        } catch (error) {
            console.error("Lỗi khi thêm đánh giá:", error);
            console.error("Chi tiết lỗi:", error.response?.data || error.message);
            alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!");
        }
    };
    
    return (
        <MainLayout>
            <CustomerLayout>
                <div className='w-full border border-emerald-700 rounded-xl shadow-xl'>
                    <div className='rounded-t-xl bg-emerald-600 text-white flex justify-between py-5 px-10 text-xl'>
                        {['Tất cả', 'Chờ xác nhận', 'Chờ lấy hàng', 'Chờ giao hàng', 'Hoàn thành'].map(select => (
                            <button 
                                key={select} 
                                className={`cursor-pointer px-4 py-2 ${selected === select ? 'border-b-2 border-white' : ''} hover:border-b-2 hover:border-white`}
                                onClick={() => handleClick(select)}
                            >
                                {select}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 px-5 pb-5 mt-5">
                        {donHangDaLoc.length > 0 ? (
                            donHangDaLoc.map((pu) => (
                                <PurchaseItem key={pu._id} {...pu} onCapNhatTrangThai={capNhatTrangThai} onDanhGia={moDanhGia}/>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Không có đơn hàng nào.</p>
                        )}
                    </div>
                </div>
                {isDanhGia && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl text-emerald-600 text-center font-semibold mb-4">Đánh giá đơn hàng</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Số sao:</label>
                                <div className="flex items-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((sao) => (
                                        <button
                                            key={sao}
                                            onClick={() => setDanhGiaMoi({ ...danhGiaMoi, soSao: sao })}
                                            className={`text-3xl transition-colors ${
                                                sao <= danhGiaMoi.soSao ? "text-yellow-500" : "text-gray-300"
                                            }`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Nội dung đánh giá:</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
                                    placeholder="Nhập nhận xét của bạn..."
                                    value={danhGiaMoi.noiDung}
                                    onChange={(e) => setDanhGiaMoi({ ...danhGiaMoi, noiDung: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button 
                                    onClick={() => {
                                        setIsDanhGia(false); 
                                        setDanhGiaMoi({ soSao: 5, noiDung: "", idDonHang: "" });
                                    }}                                    
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                                    onClick={() => themDanhGia()}
                                >
                                    Gửi đánh giá
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </CustomerLayout>
        </MainLayout>
    );
}

export default PurchasePage;
