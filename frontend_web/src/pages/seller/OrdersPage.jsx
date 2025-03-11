import MainLayout from '../../layouts/seller/MainLayout'
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from 'react';
import {BiSearch    } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function OrdersPage() {
    const navigate = useNavigate();

    const [isOpenCategory, setIsOpenCategory] = useState(false); 
    const [isDonHang, setIsDonHang] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("Tất cả");

    const [donhang, setDonHang] = useState([]);
    const [tongPages, setTongPages] = useState(1);

    const [ctDonHang, setCTDonHang] = useState(null);


    const query = new URLSearchParams(window.location.search); 
    const page = parseInt(query.get('page')) || 1;
    const filter = query.get('filter') || 'tatca';
    const limit = query.get('limit') || 1;

    const fetchDonHang = async () => {
        try {
            const response = await axios.get(`/api/donhang/lay/theocuahang?filter=${filter}&page=${page}&limit=${limit}`);
            //console.log(response.data.donHangs)
            setDonHang(response.data.donHangs);
            setTongPages(response.data.tongPage);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
        }
    };

    useEffect(() => {
        fetchDonHang();
    }, [page, filter, limit]);


    const filters = [
        { key: "tatca", label: "Tất cả" },
        { key: "choxacnhan", label: "Chờ xác nhận" },
        { key: "cholayhang", label: "Chờ lấy hàng" },
        { key: "chogiaohang", label: "Chờ giao hàng" },
        { key: "hoanthanh", label: "Hoàn thành" },
        { key: "dahuy", label: "Đã hủy" },
    ];

    const handleFilterChange = (filter) => {
        const selected = filters.find(f => f.key === filter);
        setSelectedFilter(selected?.label || "Tất cả");
        setIsOpenCategory(false);
        navigate(`?filter=${filter}&page=1&limit=7`);
    };

    
    const handlePageChange = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        
        searchParams.set("page", newPage);
        
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const xemChiTietDonHang = async (id) => {
        try {
            const res = await axios.get(`/api/donhang/lay/theoid/${id}`);
            setIsDonHang(true);
            setCTDonHang(res.data);
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin", error);
        }
    };

    const capNhatTrangThai = async (id, trangThaiMoi) => {
        try {
            await axios.put(`/api/donhang/capnhat/${id}`, { trangThai: trangThaiMoi });
            setIsDonHang(false);
            fetchDonHang();
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            console.error("Chi tiết lỗi:", error.response?.data);
        }
    };


    return (
        <MainLayout>
            {!isDonHang && ( 
            <div className='bg-white rounded-xl shadow-xl !px-5 !py-4 w-auto h-fit'>
                <div className='bg-white rounded-xl shadow-lg !px-5 !py-4 h-fit flex justify-between w-350 m-auto'>
                    <span className='flex font-bold items-center gap-3 text-gray-500'>
                        <LiaCartPlusSolid className='text-5xl text-emerald-600'/>
                        <p className='text-xl'>Bạn có 30 đơn hàng mới</p>
                    </span>
                    <div className='flex gap-3'>
                        <div className="relative">
                            <button className="h-12 w-40 cursor-pointer flex items-center justify-center gap-3 shadow-md rounded-lg border-2 border-emerald-600 text-emerald-600 font-semibold" 
                                onMouseEnter={() => setIsOpenCategory(true)}
                                onMouseLeave={() => setIsOpenCategory(false)}
                            >
                                <span>{selectedFilter}</span>
                                <IoIosArrowDown className="text-xl" />
                            </button>
                            {isOpenCategory && (
                                <div 
                                    className="w-40 absolute left-0 bg-white shadow-lg rounded-lg !p-2 z-50 border-2 border-emerald-600"
                                    onMouseEnter={() => setIsOpenCategory(true)}
                                    onMouseLeave={() => setIsOpenCategory(false)}
                                    >
                                    <ul>
                                    {filters.map((item) => (
                                        <li
                                            key={item.key}
                                            className="hover:bg-gray-100 p-2 cursor-pointer"
                                            onClick={() => handleFilterChange(item.key)}
                                        >
                                            {item.label}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="h-12 relative flex items-center shadow-lg rounded-lg border-2 border-emerald-600">
                            <BiSearch className="text-xl !ml-5 text-emerald-600" />
                            <input 
                                className="!px-5 w-80 focus:outline-none " 
                                placeholder="Nhập Id Đơn Hàng để tìm kiếm ..." 
                                type="text"
                                // value={timKiem}
                                // onChange={handleChange}
                                // onKeyPress={handleKeyPress}
                                />
                        </div>
                    </div>
                </div>
                <div className='bg-emerald-700 text-white my-5 rounded-lg shadow-lg !px-5 !py-4 h-fit grid grid-cols-6 items-center w-350 m-auto'>
                    <p className='col-span-1 text-center'>Id Đơn Hàng</p>
                    <p className='col-span-1 text-center'>Thời gian</p>
                    <p className='col-span-1 text-center'>Tên Khách Hàng</p>
                    <p className='col-span-1 text-center'>Số Điện Thoại</p>
                    <p className='col-span-1 text-center'>Đơn Giá</p>
                    <p className='col-span-1 text-center'>Trạng Thái</p>
                </div>

                {donhang.length > 0 ? (
                    <>
                        {donhang.map((pu) => (
                            <div 
                                key={pu._id}
                                className='bg-slate-50 font-semibold mb-2 rounded-lg shadow-lg !px-5 !py-4 w-350 m-auto h-fit grid grid-cols-6 items-center cursor-pointer hover:bg-slate-200'  
                                onClick={() => xemChiTietDonHang(pu._id)}>
                                <p className='col-span-1 text-center'>{pu.maDonHang || 0}</p>
                                <p className='col-span-1 text-center'>{moment(pu.ngayDat).format("DD/MM/YYYY")}</p>
                                <p className='col-span-1 text-center'>{pu.thongTinGiaoHang.hoVaTen}</p>
                                <p className='col-span-1 text-center'>{pu.thongTinGiaoHang.sdt}</p>
                                <p className='col-span-1 text-center'>{(pu.tongTienThanhToan).toLocaleString()} đ</p>
                                <p className='col-span-1 text-center'>{pu.trangThai}</p>
                            </div>
                        ))}

                        {/* Phân trang */}
                        <div className="flex justify-center items-center my-6">
                            <button 
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className={`px-4 py-2 mx-1 rounded-lg shadow hover:bg-[#1B8057] hover:text-white transition duration-200 ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}>
                                <FaAngleLeft />
                            </button>
                            {Array.from({ length: tongPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 mx-1 rounded-lg shadow hover:bg-[#1B8057] hover:text-white transition duration-200 ${page === index + 1 ? 'bg-[#1B8057] text-white' : 'bg-white'}`}>
                                    {index + 1}
                                </button>
                            ))}
                            <button 
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === tongPages}
                                className={`px-4 py-2 mx-1 rounded-lg shadow hover:bg-[#1B8057] hover:text-white transition duration-200 ${page === tongPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}>
                                <FaAngleRight />
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Không có đơn hàng nào.</p>
                )}

                

            </div>
            )}
            {isDonHang && ctDonHang && ( 
                <div className='bg-white rounded-xl shadow-xl !px-5 !py-4 w-auto h-full flex justify-center items-center'>
                    <div className='bg-slate-200 rounded-lg shadow-lg w-300 h-fit pb-5'>
                        <span className='flex items-center'>
                            <p className='w-full text-center text-3xl text-emerald-600 font-bold'>CHI TIẾT ĐƠN HÀNG</p>
                            <button 
                                className='text-emerald-600 border border-emerald-600 p-2 text-3xl cursor-pointer hover:bg-slate-300 rounded-tr-lg'
                                onClick={() => setIsDonHang(false)}
                            ><IoClose/></button>
                        </span>
                        <div className='px-10'>
                            <span className='grid grid-cols-2 grid-rows-2 gap-3 text-lg mt-5'>
                                <p>Tên Khách Hàng: {ctDonHang.thongTinGiaoHang.hoVaTen}</p>
                                <p>Hình Thức Thanh Toán:  {ctDonHang.phuongThucThanhToan}</p>
                                <p>Số Điện Thoại:  {ctDonHang.thongTinGiaoHang.sdt}</p>
                                <p>Địa chỉ: {ctDonHang.thongTinGiaoHang.diaChi}</p>
                            </span>
                            <div className='bg-emerald-700 text-white mt-5 mb-3 rounded-lg shadow-lg !px-5 !py-4  w-full h-fit grid grid-cols-7 items-center'>
                                <p className='col-span-1 text-center'>#</p>
                                <p className='col-span-2 text-center'>Tên Sản Phẩm</p>
                                <p className='col-span-1 text-center'>Phân Loại</p>
                                <p className='col-span-1 text-center'>Đơn Giá</p>
                                <p className='col-span-1 text-center'>Số Lượng</p>
                                <p className='col-span-1 text-center'>Giá</p>
                            </div>
                            <div className='max-h-70 mb-5 overflow-y-auto' style={{ scrollbarWidth: 'thin', scrollbarColor: '#9ca3af #e5e7eb' }}>
                            {ctDonHang.dsSanPham.length > 0 ? (
                                ctDonHang.dsSanPham.map((pu, index) => (
                                    <div key={pu._id} className='bg-slate-50 font-semibold mb-1 rounded-lg shadow-lg !px-5 !py-4 w-full h-fit grid grid-cols-7 items-center cursor-pointer hover:bg-slate-200'>
                                        <p className='col-span-1 text-center'>{index + 1}</p>
                                        <p className='col-span-2 text-center'>{pu.idSP.tenSP}</p>
                                        <p className='col-span-1 text-center'>{pu.phanLoai.tenLoai}</p>
                                        <p className='col-span-1 text-center'>
                                        <p className='col-span-1 text-center'>
                                        {((pu.phanLoai?.giaLoai * (1 - (pu.phanLoai?.khuyenMai || 0) / 100))).toLocaleString()} đ
                                        </p>
                                        </p>                                        <p className='col-span-1 text-center'>{pu.soLuong}</p>
                                        <p className='col-span-1 text-center'>{((pu.phanLoai?.giaLoai * (1 - (pu.phanLoai?.khuyenMai || 0) / 100)) * (pu.soLuong || 1)).toLocaleString()} đ</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
                            )}
                            </div>
                            <div className='flex justify-between items-center'>
                                {ctDonHang.trangThai === "Chờ xác nhận" && (
                                    <button 
                                        onClick={() => capNhatTrangThai(ctDonHang._id, "Chờ lấy hàng")} 
                                        className='m-auto bg-emerald-600 text-white font-semibold text-xl px-7 py-3 cursor-pointer hover:bg-emerald-700'>
                                        Xác nhận
                                    </button>
                                )}

                                {ctDonHang.trangThai === "Chờ lấy hàng" && (
                                    <button 
                                        onClick={() => capNhatTrangThai(ctDonHang._id, "Chờ giao hàng")} 
                                        className='m-auto bg-blue-600 text-white font-semibold text-xl px-7 py-3 cursor-pointer hover:bg-blue-700'>
                                        Đã giao đơn vị vận chuyển
                                    </button>
                                )}

                                <span className='w-90 text-lg flex flex-col gap-2 font-semibold'>
                                    <span className='flex justify-between w-90'>
                                        <p>Tổng Tiền Hàng:</p>
                                        <p>{ctDonHang.tongTienHang.toLocaleString()} đ</p>
                                    </span>
                                    <span className='flex justify-between w-90'>
                                        <p>Tiền Vận Chuyển:</p>
                                        <p>{ctDonHang.phiVanChuyen.toLocaleString()} đ</p>
                                    </span>
                                    <span className='flex justify-between w-90 text-emerald-600'>
                                        <p>Tổng Thanh Toán:</p>
                                        <p className='text-2xl'>{ctDonHang.tongTienThanhToan.toLocaleString()} đ</p>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

export default OrdersPage