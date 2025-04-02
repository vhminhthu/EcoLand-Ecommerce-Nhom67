import { useEffect, useState } from 'react'; 
import moment from 'moment';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../layouts/seller/MainLayout';
import { BsArrowDownRightCircleFill, BsArrowDownLeftCircleFill } from "react-icons/bs";
import axios from 'axios';
import Loading from '../../components/customer/layout/Loading';

function FinancePage() {
    const { user, loading } = useAuth();
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(5);
    const [dsGiaoDich, setDsGiaoDich] = useState([]);
    const [hienForm, setHienForm] = useState(false);
    const [soTien, setSoTien] = useState("");
    const [soTaiKhoan, setSoTaiKhoan] = useState("");
    const [tenNganHang, setTenNganHang] = useState("");
    const [chuTaiKhoan, setChuTaiKhoan] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/giaodich/lay-ruttien`);
                setDsGiaoDich(res.data);
            } catch (err) {
                setError(err);
            }
        };
    
        fetchData();
    }, []);

    const handleRutTien = async () => {
        if(!soTien || !soTaiKhoan || !tenNganHang || !chuTaiKhoan) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const soTaiKhoanRegex = /^[a-zA-Z0-9]{6,15}$/;
        if (!soTaiKhoanRegex.test(soTaiKhoan)) {
            alert("Số tài khoản phải từ 6 - 15 ký tự, chỉ bao gồm chữ cái và số!");
            return;
        }
        
        if (soTien <= 0 || soTien > 1000000000) {
            alert("Số tiền không hợp lệ!");
            return;
        }

        if (soTien < 100000 || soTien > 100000000) {
            alert("Số tiền phải từ 100.000 đến 100.000.000!");
            return;
        }
    
        if (user.soDuTien <= 0 || user.soDuTien < soTien) {
            alert("Số dư tài khoản không đủ!");
            return;
        }
        if(!window.confirm("Xác nhận gửi yêu cầu rút tiền?")) return;
        try {
            await axios.post(`/api/giaodich/them-ruttien`, {
                soTien,
                thongTinRutTien: { soTaiKhoan, tenNganHang, chuTaiKhoan },
            });
            alert("Gửi yêu cầu rút tiền thành công!");
            setSoTien("");
            setSoTaiKhoan("");
            setTenNganHang("");
            setChuTaiKhoan("");
            setHienForm(false);
            window.location.reload();
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu rút tiền:", error.message);
            alert("Lỗi! Vui lòng thử lại sau.");
        }
    };

    const handleShowMore = () => {
        setLimit((prevLimit) => prevLimit + 5);
    };

    const handleHuy = () => {
        setSoTien("");
        setSoTaiKhoan("");
        setTenNganHang("");
        setChuTaiKhoan("");
        setHienForm(false);
    };
    
    if (loading) return <Loading />;
    if (error) return <p className="text-red-500 font-semibold">Đã xảy ra lỗi: {error.message}</p>;
    return (
        <MainLayout>
            <div className='bg-white rounded-xl shadow-xl p-10 w-auto h-fit'>
                <span className='flex justify-between items-center'>
                    <span className='flex gap-2 text-xl items-center'>
                        Số dư: <p className='text-5xl font-bold text-blue-700'>{user.soDuTien.toLocaleString()} VND</p>
                    </span>

                    <button onClick={() => setHienForm(!hienForm)} className='bg-emerald-800 text-xl text-white font-semibold px-5 py-3 rounded-md shadow-2xs cursor-pointer hover:bg-emerald-950'>Gửi yêu cầu rút tiền</button>
                </span>

                <p className='text-2xl font-bold mt-10 ml-10'>Truy vấn giao dịch</p>

                <div>
                    {user.nguonTien.slice(0, limit).map((giaodich, index) => (
                        <div key={index} className='bg-slate-50 rounded-md shadow-md m-10 mt-5'>
                            <p className='text-xl font-semibold bg-slate-200 p-3 rounded-t-md'>
                                {moment(giaodich.ngay).format("DD/MM/YYYY")}
                            </p>

                            <div className='p-3 flex text-lg gap-5'>
                                <p className='text-3xl'>
                                    {giaodich.loaiTien === "Cộng" 
                                        ? <BsArrowDownRightCircleFill className='text-green-500'/> 
                                        : <BsArrowDownLeftCircleFill className='text-red-500'/>}
                                </p>
                                <span className='flex flex-col w-full'>
                                    <span className='flex justify-between items-center'>
                                        <p className='text-xl mb-3 font-semibold'>
                                            {giaodich.loaiTien === "Cộng" ? "TIỀN VÀO" : "TIỀN RA"}
                                        </p>
                                        <p className={`font-bold ${giaodich.loaiTien === "Cộng" ? 'text-green-500' : 'text-red-500'}`}>
                                            {giaodich.loaiTien === "Cộng" ? '+' : '-'} {giaodich.soTien.toLocaleString()} VND
                                        </p>
                                    </span>
                                    <span className='flex justify-between items-center'>
                                        <p>{giaodich.noidung}</p>
                                        <p className='text-gray-500'>{moment(giaodich.ngay).format("HH:mm")}</p>
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {limit < user.nguonTien.length && (
                    <div className='text-center my-5'>
                        <button 
                            onClick={handleShowMore} 
                            className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300'
                        >
                            Xem thêm
                        </button>
                    </div>
                )}

                <p className='text-2xl font-bold mt-10 ml-10'>Truy vấn yêu cầu rút tiền</p>
                <div>
                    {dsGiaoDich.slice(0, limit).map((rutTien, index) => (
                        <div key={index} className='bg-slate-50 rounded-md shadow-md m-10 mt-5'>
                            <p className='text-xl font-semibold bg-slate-200 p-3 rounded-t-md'>
                                {moment(rutTien.ngay).format("DD/MM/YYYY")}
                            </p>

                            <div className='p-3 flex text-lg gap-5'>
                                <p className='text-3xl'>
                                    <BsArrowDownLeftCircleFill className='text-red-500'/>
                                </p>
                                <span className='flex flex-col w-full'>
                                    <span className='flex justify-between items-center'>
                                        <p className='text-xl font-semibold'>Yêu cầu rút tiền</p>
                                        <p className='font-bold text-red-500'>- {rutTien.soTien.toLocaleString()} VND</p>
                                    </span>

                                    <div className='bg-white p-3 rounded-md shadow-sm mt-2'>
                                        <p className='font-semibold'>Ngân hàng: {rutTien.thongTinRutTien.tenNganHang}</p>
                                        <p>Số tài khoản: {rutTien.thongTinRutTien.soTaiKhoan}</p>
                                        <p>Chủ tài khoản: {rutTien.thongTinRutTien.chuTaiKhoan}</p>
                                    </div>

                                    <span className='flex justify-between items-center mt-2'>
                                        <p className='text-gray-500'>{moment(rutTien.ngay).format("HH:mm")}</p>
                                        <p className={`font-semibold px-3 py-1 rounded-md text-white 
                                            ${rutTien.trangThai === "Chờ xử lý" ? "bg-yellow-500" : 
                                            rutTien.trangThai === "Đã xử lý" ? "bg-green-500" : "bg-red-500"}`}>
                                            {rutTien.trangThai}
                                        </p>
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {hienForm && (
                    <div className="fixed top-0 left-0 w-full h-screen bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
                            <h2 className="text-xl font-semibold text-center mb-4">Yêu Cầu Rút Tiền</h2>
                            <div className="mb-3">
                                <label className="block font-medium">Tên Ngân Hàng</label>
                                <input 
                                    type="text" 
                                    value={tenNganHang} 
                                    onChange={(e) => setTenNganHang(e.target.value)}
                                    className="border p-2 w-full rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block font-medium">Số Tài Khoản</label>
                                <input 
                                    type="text" 
                                    value={soTaiKhoan} 
                                    onChange={(e) => setSoTaiKhoan(e.target.value)}
                                    className="border p-2 w-full rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block font-medium">Số Tiền</label>
                                <input 
                                    type="number" 
                                    value={soTien} 
                                    onChange={(e) => setSoTien(e.target.value)}
                                    className="border p-2 w-full rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block font-medium">Chủ Tài Khoản</label>
                                <input 
                                    type="text" 
                                    value={chuTaiKhoan} 
                                    onChange={(e) => setChuTaiKhoan(e.target.value)}
                                    className="border p-2 w-full rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-center gap-4 mt-4">
                                <button 
                                    onClick={handleRutTien} 
                                    className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
                                >
                                    Gửi Yêu Cầu
                                </button>
                                <button 
                                    onClick={handleHuy} 
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg"
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default FinancePage;
