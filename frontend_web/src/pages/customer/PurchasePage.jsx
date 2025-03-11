import CustomerLayout from '../../layouts/customer/CustomerLayout'
import MainLayout from '../../layouts/customer/MainLayout'
import { useState, useEffect } from 'react';
import PurchaseItem from '../../components/customer/common/items/PurchaseItem';
import axios from 'axios';

function PurchasePage() {
    const [selected, setSelected] = useState('Tất cả');
    const [donhang, setDonHang] = useState([]);
    const [danhGiaMoi, setDanhGiaMoi] = useState(null);

    const [isDanhGia, setIsDanhGia] = useState(false);


    const fetchDonHang = async () => {
        try {
            const response = await axios.get(`/api/donhang/lay/theonguoidung`);
            // console.log(response.data.donHangs)
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

    const moDanhGia = (idDonHang, sanPhamDanhGia) => {
        // console.log("ID đơn hàng:", idDonHang);
        // console.log("Danh sách sản phẩm đánh giá:", sanPhamDanhGia);
        setDanhGiaMoi({
            idDonHang,
            sanPhamDanhGia: sanPhamDanhGia.map(sp => ({
                ...sp,
                soSao: 5,
                noiDung: ""
            }))
        });
        setIsDanhGia(true);
    };

    useEffect(() => {
        if (danhGiaMoi !== null) {
            setIsDanhGia(true);
        }
    }, [danhGiaMoi]); 

    const themDanhGia = async () => {
        try {
            await axios.post(`/api/danhgia/them`, danhGiaMoi);
            fetchDonHang();
            setDanhGiaMoi(null);
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
                                <PurchaseItem key={pu._id} {...pu} onCapNhatTrangThai={capNhatTrangThai} moDanhGia={moDanhGia}/>
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
                            {danhGiaMoi.sanPhamDanhGia.map((sp, index) => (
                                <div key={sp.idSP} className="mb-4 border-b pb-4">
                                    <div className='flex gap-2'>
                                        <img src={sp.idSP.dsAnhSP} alt={sp.idSP.tenSP} className='w-14 h-14 object-cover rounded' />
                                        <span>
                                            <p className="text-lg font-semibold">{sp.idSP.tenSP}</p>
                                            <p className="text-sm text-gray-600">{sp.phanLoai.tenLoai}</p>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className='mr-5'>Chất lượng sản phẩm</p>
                                        {[1, 2, 3, 4, 5].map((sao) => (
                                            <button
                                                key={sao}
                                                onClick={() => {
                                                    const updatedSanPhamDanhGia = [...danhGiaMoi.sanPhamDanhGia];
                                                    updatedSanPhamDanhGia[index].soSao = sao;
                                                    setDanhGiaMoi({ ...danhGiaMoi, sanPhamDanhGia: updatedSanPhamDanhGia });
                                                }}
                                                className={`text-3xl transition-colors cursor-pointer ${
                                                    sao <= sp.soSao ? "text-yellow-500" : "text-gray-300"
                                                }`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none mt-2"
                                        placeholder="Nhập nhận xét của bạn..."
                                        value={sp.noiDung}
                                        onChange={(e) => {
                                            const updatedSanPhamDanhGia = [...danhGiaMoi.sanPhamDanhGia];
                                            updatedSanPhamDanhGia[index].noiDung = e.target.value;
                                            setDanhGiaMoi({ ...danhGiaMoi, sanPhamDanhGia: updatedSanPhamDanhGia });
                                        }}
                                    />
                                </div>
                            ))}

                            <div className="flex justify-end gap-3">
                                <button 
                                    onClick={() => {
                                        setIsDanhGia(false); 
                                        setDanhGiaMoi(null);
                                    }}                                    
                                    className=" border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                                >
                                    Trở lại
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 cursor-pointer"
                                    onClick={() => themDanhGia()}
                                >
                                    Hoàn thành
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
