import { Link } from "react-router-dom";
import {BiBell , BiHeart , BiCart, BiUser, BiMenu,BiSearch    } from "react-icons/bi";
import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function Header({ thongBaoList }) {
    const navigate = useNavigate();
    const [isOpenBell, setIsOpenBell] = useState(false);
    const [isOpenUser, setIsOpenUser] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false); 

    const categories = [
        "Thiết kế đồ họa",
        "Lập trình web",
        "Dịch thuật",
        "Viết lách",
        "Marketing số",
        "Tư vấn kinh doanh",
        "Chỉnh sửa video",
    ];
    return (
        <div className="header bg-emerald-600">
            <div className="flex justify-between items-center !mx-16 !py-4">
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="logo bg-emerald-500 w-12 h-12 rounded-full"></div>
                    <h1 className="text-emerald-500 font-bold">LOGO</h1>
                </div>
                <div className="flex rounded-xl">
                    <div className="text-white bg-emerald-500 rounded-l-xl">
                        <select className="!px-10 !py-3">
                            <option>Tất cả danh mục</option>
                        </select>
                    </div>
                    <div className="flex items-center bg-emerald-500 rounded-r-xl border-l border-emerald-600">
                        <input className=" !px-10 !py-3 text-white text-m w-100 p-1 rounded" placeholder="Bạn cần tìm gì?" type="text"/>
                        <BiSearch className="text-xl !mr-5 text-white" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <button
                            className="cursor-pointer relative text-white hover:bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center"
                            onClick={() => setIsOpenBell(!isOpenBell)}
                        >
                            <BiBell className="text-xl" />
                        </button>

                        {isOpenBell && (
                            <div className="absolute right-0 !mt-2 w-64 bg-white shadow-lg rounded-lg !p-2 z-50">
                                <h3 className="text-base font-semibold text-emerald-800 border-b !pb-2">Thông Báo Mới Nhận</h3>
                                <ul className="max-h-60 overflow-y-auto">
                                    {thongBaoList.slice(0, 10).map((sp) => (
                                        <li key={sp.id} className="flex items-center gap-3 !p-2 hover:bg-gray-100">
                                            <img src={sp.img} alt={sp.ten} className="w-10 h-10 rounded-md" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{sp.ten}</span>
                                                <span className="text-xs text-gray-500">{sp.gia}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/customer/notification" className="block text-center text-gray-400 hover:text-emerald-700 text-sm !mt-2">
                                    Xem tất cả
                                </Link>
                            </div>
                        )}
                    </div>

                    <button
                        className="cursor-pointer relative text-white hover:bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center"
                        onClick={() => navigate("/customer/wishlist")}
                    >
                        <BiHeart className="text-xl" />
                    </button>

                    <button
                        className="cursor-pointer relative text-white hover:bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center"
                        onClick={() => navigate("/cart")}
                    >
                        <BiCart className="text-xl" />
                    </button>

                    <div className="relative">
                        <button
                            className="cursor-pointer relative text-white hover:bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center"
                            onClick={() => setIsOpenUser(!isOpenUser)}
                        >
                            <BiUser className="text-xl" />
                        </button>

                        {isOpenUser && (
                            <div className="absolute right-0 !mt-2 w-50 bg-white shadow-lg rounded-lg !p-2 z-50">
                                <ul className="max-h-60 overflow-y-auto">
                                    <li>
                                        <Link to="/customer/account/profile" className="block hover:text-emerald-600 hover:bg-gray-100 font-medium !p-3">
                                            Tài Khoản Của Tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/customer/purchase" className="block hover:text-emerald-600 hover:bg-gray-100 font-medium !p-3">
                                            Đơn hàng của tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/seller/home" className="block hover:text-emerald-600 hover:bg-gray-100 font-medium !p-3">
                                            Kênh người bán
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="block hover:text-emerald-600 hover:bg-gray-100 font-medium !p-3">
                                            Đăng xuất
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-5 items-center !mx-16 !py-4 border-t border-emerald-500">
                <div className="relative">
                    <button className="cursor-pointer flex items-center gap-3 text-white bg-emerald-500 !px-5 !py-2 rounded-xl" 
                        onMouseEnter={() => setIsOpenCategory(true)}
                        onMouseLeave={() => setIsOpenCategory(false)}
                    >
                        <BiMenu className="text-2xl" />
                        <span>Danh mục</span>
                    </button>
                    {isOpenCategory && (
                        <div className="absolute left-0 !mt-2 w-60 bg-white shadow-lg rounded-lg !p-2 z-50">
                            <ul>
                                {categories.map((category, index) => (
                                    <li key={index} className="hover:bg-gray-100 !p-2 cursor-pointer" onClick={() => navigate(`/category/${category}`)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="flex gap-5">
                    <Link to="/">
                        <div className="text-white hover:bg-emerald-500 !px-8 !py-2 rounded-xl">
                            Trang chủ
                        </div>
                    </Link>

                    <Link to="/customer/support">
                        <div className=" text-white hover:bg-emerald-500 !px-8 !py-2 rounded-xl">
                            Hỗ trợ
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {
    thongBaoList: PropTypes.array.isRequired,
};
export default Header