import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import MainLayout from "../../layouts/customer/MainLayout";

const PaymentResult = () => {
    const giaodichId = Cookies.get('giaodichId');
    const [giaodich, setGiaodich] = useState(null);
    const [countdown, setCountdown] = useState(30);
    const navigate = useNavigate();

    useEffect(() => {
        if (giaodichId) {
            const fetchGiaoDichData = async () => {
                try {
                    const response = await axios.get(`/api/giaodich/lay/${giaodichId}`);
                    console.log("Dữ liệu giao dịch: ", response.data.giaodich);
                    setGiaodich(response.data.giaodich);
                } catch (err) {
                    console.error('Lỗi khi tải giao dịch:', err);
                    navigate('/');
                }
            };

            fetchGiaoDichData();

            setCountdown(30);
        } else {
            navigate('/');
        }
    }, [giaodichId, navigate]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            navigate('/');
        }
    }, [countdown, navigate]);

    if (!giaodich) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <div className='bg-red-50 p-5 rounded-lg shadow-xl'>
                    <p>Không có giao dịch.</p>
                </div>
            </div>
        );
    }

    return (
        <MainLayout>
            <div className='flex items-center justify-center'>
                {/* Kiểm tra trạng thái thanh toán và hiển thị thông tin */}
                {giaodich.thongTinGiaoDich.trangThaiThanhToan === "Thất bại" ? (
                    <div className='bg-red-50 p-5 rounded-lg shadow-xl'>
                        <FaCircleXmark className='text-6xl text-red-600 m-auto mb-3' />
                        <p className="flex justify-center items-center">Thanh toán thất bại!</p>
                        {giaodich.thongTinGiaoDich && (
                            <>
                                <p><strong>Số tiền:</strong> {giaodich.soTien.toLocaleString('vi-VN')}</p>
                                <p><strong>Mã đơn hàng:</strong> {giaodich.thongTinGiaoDich.maGiaoDich}</p>
                                <p><strong>Thời gian:</strong> {moment(giaodich.thongTinGiaoDich.ngayGiaoDich).format('YYYY-MM-DD hh:mm A')} </p>
                                <p><strong>Phương thức thanh toán:</strong> {giaodich.thongTinGiaoDich.loaiGiaoDich} ({giaodich.thongTinGiaoDich.loaiThe})</p>
                            </>
                        )}
                        <p className="text-xs">Thời gian còn lại: {countdown} giây</p>
                        <div
                            onClick={() => navigate('/')}
                            className="cursor-pointer p-3 bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 transition duration-200 flex items-center justify-center text-center"
                            >
                            Đóng
                        </div>
                    </div>
                ) : giaodich.thongTinGiaoDich.trangThaiThanhToan === "Thành công" ? (
                    <div className='bg-green-50 p-5 rounded-lg shadow-xl'>
                        <FaCheckCircle className='text-6xl text-green-600 m-auto mb-3' />
                        <p className="flex justify-center items-center">Thanh toán thành công!</p>
                        {giaodich.thongTinGiaoDich && (
                            <>
                                <p><strong>Số tiền:</strong> {giaodich.soTien.toLocaleString('vi-VN')}</p>
                                <p><strong>Mã đơn hàng:</strong> {giaodich.thongTinGiaoDich.maGiaoDich}</p>
                                <p><strong>Thời gian:</strong> {moment(giaodich.thongTinGiaoDich.ngayGiaoDich).format('YYYY-MM-DD hh:mm A')} </p>
                                <p><strong>Phương thức thanh toán:</strong> {giaodich.thongTinGiaoDich.loaiGiaoDich} ({giaodich.thongTinGiaoDich.loaiThe})</p>
                            </>
                        )}
                        <p className="text-sm">Thời gian còn lại: {countdown} giây</p>
                        <div
                            onClick={() => navigate('/')}
                            className="cursor-pointer p-3 bg-green-500 text-white rounded-md hover:bg-green-600 active:scale-95 transition duration-200 flex items-center justify-center text-center"
                            >
                            Đóng
                        </div>
                    </div>
                ) : (
                    <div className='bg-gray-50 p-5 rounded-lg shadow-xl'>
                        <p>Không có giao dịch.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default PaymentResult;
