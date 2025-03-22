import MainLayout from '../../layouts/customer/MainLayout'
import { MdOutlineStorefront } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutItem from '../../components/customer/common/items/CheckoutItem';
import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';
import { useEffect } from 'react';
function CheckoutPage() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedItems, totalPrice, totalQuantity } = location.state || { selectedItems: [], totalPrice: 0, totalQuantity: 0 };
    const tienShip = 14000;
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [message, setMessage] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const thongTinMacDinh = user?.thongTinGiaoHang || { hoVaTen: "", sdt: "", diaChi: "" };
    const [thongTinGH, setThongTinGH] = useState(thongTinMacDinh);

    const [tenCH, setTenCH] = useState("");
    const idCH = selectedItems.length > 0 ? selectedItems[0]?.idSP?.idCH : null;

    // console.log("selectedItems", selectedItems)
    
    // console.log("totalPrice", totalPrice)
    
    // console.log("totalQuantity", totalQuantity)

    useEffect(() => {
        const getTenCH = async () => {
            if (!idCH) return;
            try {
                const response = await axios.get(`/api/cuahang/lay/${idCH}`);
                setTenCH(response.data.tenCH || "Không xác định");
            } catch (error) {
                console.error("Lỗi khi lấy tên cửa hàng:", error);
            }
        };

        getTenCH();
    }, [idCH]);


    const thayDoiThongTinGiaoHang = (e) => {
        const { name, value } = e.target;
        setThongTinGH(prev => ({ ...prev, [name]: value }));
    };

    const luuThongTinGiaoHang = async () => {
        try {
            await axios.put(`/api/nguoidung/capnhat/thongtinGiaoHang`, thongTinGH);
            setIsEditing(false);
            setUser((prevUser) => ({
                ...prevUser,
                thongTinGiaoHang: thongTinGH
            }));
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin", error);
        }
    };

    const themDonHang = async () => {
        try {
            const response = await axios.post("/api/donhang/them", {
                thongTinGiaoHang: {
                    hoVaTen: user?.thongTinGiaoHang?.hoVaTen,
                    sdt: user?.thongTinGiaoHang?.sdt,
                    diaChi: user?.thongTinGiaoHang?.diaChi,
                },
                dsSanPham: selectedItems.map(item => {
                    const selectedPhanLoai = item.idSP.phanLoai.find(loai => loai.idPL === item.idLoai);
                    return {
                        idSP: item.idSP._id,
                        phanLoai: selectedPhanLoai
                            ? {
                                idPL: selectedPhanLoai.idPL,
                                tenLoai: selectedPhanLoai.tenLoai,
                                giaLoai: selectedPhanLoai.giaLoai,
                                khuyenMai: selectedPhanLoai.khuyenMai
                            }
                            : {},
                        soLuong: item.soLuong
                    };
                }),
                tongTienHang: totalPrice,
                luuY: message,
                phiVanChuyen: tienShip,
                phuongThucThanhToan: paymentMethod,
                tongTienThanhToan: totalPrice + tienShip,
                cuaHangId: idCH,
            });
            console.log(response)
    
            return response;
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            throw error;
        }
    };
    
    const datHang = async () => {
        try {
            const response = await themDonHang();
            if (response.status === 201) {
                alert("Đặt hàng thành công!");
                navigate("/cart");
            } else {
                alert("Lỗi khi đặt hàng!");
            }
        } catch (error) {
            alert("Đặt hàng thất bại!");
            console.error("Lỗi khi đặt hàng", error);
        }
    };
    
    const thanhToanVNPAY = async () => {
        try {
            const response = await themDonHang();
            if (response.status === 201) {
                const donhangId = response.data.donhang._id; 
                console.log('donhangId:', donhangId);
                alert(`Thêm thành công! DonhangId: ${donhangId}`);
    
                const newPayment = {
                    amount: totalPrice + tienShip,
                    bankCode: null,
                    language: "vn",
                    donhangId: donhangId,
                };
    
                const paymentResponse = await axios.post('/api/vnpay/create_payment_url', newPayment);
                if (paymentResponse.status === 200 && paymentResponse.data) {
                    window.location.href = paymentResponse.data;
                }
            } else {
                alert("Lỗi khi tạo đơn hàng!");
            }
        } catch (error) {
            alert("Thanh toán thất bại!");
            console.error("Lỗi khi thanh toán VNPAY", error);
        }
    };
    
    return (
        <MainLayout>
            <h1 className='text-xl mb-5'>Thanh toán</h1>

            <div className='w-full p-6 bg-slate-50 shadow-md mb-5 items-center border-t-4 border-emerald-600'>
                <p className='text-emerald-600 text-2xl mb-3'>Địa Chỉ Nhận Hàng</p>
                <div className='flex gap-5 text-xl'>
                    <p className='font-semibold'>{user?.thongTinGiaoHang?.hoVaTen}</p>
                    <p className='font-semibold'>{user?.thongTinGiaoHang?.sdt}</p>
                    <p>{user?.thongTinGiaoHang?.diaChi}</p>
                    <p className='text-emerald-600 cursor-pointer' onClick={() => setIsEditing(true)} >Thay Đổi</p>
                </div>
            </div>

            {isEditing && ( 
                <div className='fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                        <h2 className='text-xl font-semibold border-b pb-3'>Thay đổi địa chỉ</h2>
                        <input className='border p-2 rounded w-full mt-5 mb-3' type="text" name="hoVaTen" value={thongTinGH.hoVaTen} onChange={thayDoiThongTinGiaoHang} placeholder="Họ và tên"/>
                        <input className='border p-2 rounded w-full mb-3' type="text" name="sdt" value={thongTinGH.sdt} onChange={thayDoiThongTinGiaoHang} placeholder="Số điện thoại"/>
                        <input className='border p-2 rounded w-full mb-5' type="text" name="diaChi" value={thongTinGH.diaChi} onChange={thayDoiThongTinGiaoHang} placeholder="Địa chỉ"/>
                        <div className='flex gap-3 border-t pt-3'>
                            <button className='bg-red-500 cursor-pointer text-white px-5 py-2 rounded w-full hover:bg-red-600' onClick={() => setIsEditing(false)}>Hủy</button>
                            <button className='bg-green-500 cursor-pointer text-white px-5 py-2 rounded w-full hover:bg-green-600' onClick={luuThongTinGiaoHang}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='w-full bg-slate-50 shadow-md mb-5 items-center'>
                <div className='grid grid-cols-12 pt-6 px-6'>
                    <div className='col-span-6 text-xl'>Sản Phẩm</div>
                    <div className='col-span-2 text-center text-gray-600'>Đơn Giá</div>
                    <div className='col-span-2 text-center text-gray-600'>Số lượng</div>
                    <div className='col-span-2 text-center text-gray-600'>Thành tiền</div>
                </div>
                
                <div className='flex gap-3 items-center text-lg my-5 px-6'>
                    <MdOutlineStorefront/>
                    {tenCH}
                </div>

                {selectedItems.map((sanPham) => (
                    <CheckoutItem key={sanPham?._id}  {...sanPham}/>
                ))}

                <div className='border-t border-gray-300 mt-5 bg-green-50 h-fit'>
                    <div className='grid grid-cols-5'>
                        <div className='col-span-2 border-r border-b border-gray-300 border-dashed py-5 pl-5'>
                            <label>Lời nhắn:</label>
                            <input 
                                className="ml-3 !px-5 !py-3 bg-white text-m w-100 p-1 rounded focus:outline-none " 
                                placeholder="Lưu ý cho Người bán ..." 
                                type="text"
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                            />
                        </div>
                        <div className='col-span-3 border-b border-gray-300 border-dashed grid grid-cols-6 p-5'>
                            <div className='col-span-2'>Phương thức vận chuyển</div>
                            <div className='col-span-3'>
                                <p>Vận chuyển trong nước</p>
                            </div>
                            <div className='col-span-1 text-emerald-600'>
                                {tienShip.toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className='py-5 px-20 flex gap-5 justify-end'>
                        <p>Tổng số tiền ({totalQuantity} sản phẩm):</p>
                        <p className='text-2xl text-emerald-600'>{totalPrice.toLocaleString()} đ</p>
                    </div>

                </div>
            </div>

            <div className='w-full p-5 bg-slate-50 shadow-md mb-5'>
                <div className='flex gap-5 items-center border-b border-gray-300 border-dashed pb-5'>
                    <p>Phương thức thanh toán</p>
                    <div className='flex gap-3'>
                        <button 
                            className={`cursor-pointer rounded-sm border p-3 ${paymentMethod === "COD" ? 'bg-emerald-500 text-white' : 'hover:border-emerald-900 hover:bg-emerald-500 hover:text-white'}`} 
                            onClick={() => setPaymentMethod("COD")}
                        >Thanh toán khi nhận hàng</button>
                        <button 
                            className={`cursor-pointer rounded-sm border p-3 ${paymentMethod === "VNPAY" ? 'bg-emerald-500 text-white' : 'hover:border-emerald-900 hover:bg-emerald-500 hover:text-white'}`} 
                            onClick={() => setPaymentMethod("VNPAY")}
                        >VNPAY</button>
                    </div>
                </div>
                <div className='flex flex-col items-end pt-5 px-15 border-b border-gray-300 border-dashed pb-5'>
                    <span className='flex justify-between w-80'>
                        <p>Tổng tiền hàng</p>
                        <p>{totalPrice.toLocaleString()} đ</p>
                    </span>
                    <span className='flex justify-between w-80 mt-5'>
                        <p>Tổng tiền phí vận chuyển</p>
                        <p>{tienShip.toLocaleString()} đ</p>
                    </span>
                    <span className='flex justify-between w-80 mt-5'>
                        <p>Tổng thanh toán</p>
                        <p className='text-emerald-600 text-3xl font-semibold'>{(totalPrice + tienShip).toLocaleString()} đ</p>
                    </span>
                </div>
                <div className='flex justify-between items-center pt-5 px-15'>
                    <p>Nhấn Đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo <span className='text-emerald-700'>Điều khoản EcoLand</span></p>
                    <button
                        className="py-3 px-20 rounded-sm bg-emerald-700 text-white text-xl cursor-pointer hover:bg-emerald-600"
                        onClick={() => {
                            if (paymentMethod === "COD") {
                            datHang();
                            } else if (paymentMethod === "VNPAY") {
                            thanhToanVNPAY();
                            }
                        }}
                        >
                    Đặt hàng
                    </button>

                </div>
            </div>
        </MainLayout>
    )
}

export default CheckoutPage