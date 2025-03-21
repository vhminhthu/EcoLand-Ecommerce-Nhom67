import { Link } from "react-router-dom";
import {BiHeart , BiCart, BiUser, BiMenu,BiSearch    } from "react-icons/bi";
import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect } from "react";
import axios from "axios";

function Header() {
    const navigate = useNavigate();

    const [isOpenUser, setIsOpenUser] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false); 
    const [isOpenCategorySearch, setIsOpenCategorySearch] = useState(false); 

    const [chonDanhMucTimKiem, setChonDanhMucTimKiem] = useState("Tất cả danh mục");
    const [danhMucChon, setDanhMucChon] = useState("");
    const [timKiem, setTimKiem] = useState("");
    const [danhSachGoiY, setDanhSachGoiY] = useState([]);
    const [danhSachGoiYCuaHang, setDanhSachGoiYCuaHang] = useState([]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setTimKiem(value);
        if (value.trim() === '') {
            setDanhSachGoiY([]);
            setDanhSachGoiYCuaHang([]);
            return;
        }
        
        try {
            const response = await axios.get(`/api/sanpham/search/goiy?search=${value}&danhmuc=${danhMucChon}`);
            setDanhSachGoiY(response.data.goiY);
            setDanhSachGoiYCuaHang(response.data.goiYCuaHang);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && (danhSachGoiY.length > 0 || danhSachGoiYCuaHang.length > 0)) {
            navigate(`/search/sp?search=${timKiem}&sort=phobien&page=1&limit=20`, {state: { id: danhMucChon }});
        }
    };

    const xuLyChonGoiY = (goiY) => {
        setTimKiem(goiY.tenSP);
        setDanhSachGoiY([]);
        setDanhSachGoiYCuaHang([]);
        const nameProduct = goiY.tenSP.replace(/\s+/g, '-');
        navigate(`/${nameProduct}`, {
            state: { id: goiY._id },
        });
    };

    const xuLyChonGoiYCuaHang = (goiY) => {
        setTimKiem(goiY.tenCH);
        setDanhSachGoiY([]);
        setDanhSachGoiYCuaHang([]);
        const nameShop = goiY.tenCH.replace(/\s+/g, '-');
        navigate(`/shop/${nameShop}?sort=phobien&page=1&limit=15`, {
            state: { id: goiY._id },
        });
    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/danhmuc/lay');
                // console.log(response.data);
                setCategories(response.data); 
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy danh mục:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategorySelect = (category) => {
        if (!category) {
            setDanhMucChon("");
            setChonDanhMucTimKiem("Tất cả danh mục");
            setIsOpenCategorySearch(false);
            return;
        } else{
            setDanhMucChon(category?._id);
            setChonDanhMucTimKiem(category?.tenDM);
            setIsOpenCategorySearch(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            navigate("/signup");
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        }
    };


    return (
        <div className="header bg-emerald-600 min-w-7xl">
            <div className="flex justify-between items-center !py-4 !mx-auto max-w-7xl">
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="logo bg-emerald-500 w-12 h-12 rounded-full"></div>
                    <h1 className="text-white font-bold text-3xl">EcoLand</h1>
                </div>
                <div className="flex rounded-xl">
                    <div className="text-white bg-emerald-500 rounded-l-xl">
                        <div className="relative">
                            <button
                                className="cursor-pointer relative text-white hover:bg-emerald-500 w-45 h-12 rounded-full flex gap-2 items-center justify-center"
                                onMouseEnter={() => setIsOpenCategorySearch(true)}
                                onMouseLeave={() => setIsOpenCategorySearch(false)}
                            >
                                {chonDanhMucTimKiem} <IoIosArrowDown />
                            </button>

                            {isOpenCategorySearch && (
                                <div 
                                    className="absolute left-0 w-45 bg-white shadow-lg rounded-l-lg !p-2 z-50"
                                    onMouseEnter={() => setIsOpenCategorySearch(true)}
                                    onMouseLeave={() => setIsOpenCategorySearch(false)}
                                >
                                    <ul>
                                        <li 
                                            className="text-black font-semibold hover:bg-gray-100 !p-2 cursor-pointer"
                                            onClick={() => handleCategorySelect(null)}
                                        >
                                            Tất cả danh mục
                                        </li>
                                        {categories.map((category, index) => (
                                            <li key={index} className=" text-black hover:bg-gray-100 !p-2 cursor-pointer" onClick={() => handleCategorySelect(category)}>
                                                {category?.tenDM}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative flex items-center bg-emerald-500 rounded-r-xl border-l border-emerald-600">
                        <input 
                            className=" !px-5 !py-3 text-white text-m w-100 p-1 rounded focus:outline-none " 
                            placeholder="Bạn cần tìm gì?" 
                            type="text"
                            value={timKiem}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            />
                        <BiSearch className="text-xl !mr-5 text-white" />
                        {(danhSachGoiYCuaHang.length > 0 || danhSachGoiY.length > 0) && (
                            <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-r-lg z-50 border-b">
                                <ul>
                                    {danhSachGoiYCuaHang.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-lg p-2">Gợi ý cửa hàng:</h3>
                                            {danhSachGoiYCuaHang.map((item, index) => (
                                                <li 
                                                    key={index} 
                                                    className="!p-2 text-black hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => xuLyChonGoiYCuaHang(item)}
                                                >
                                                    {item.tenCH}
                                                </li>
                                            ))}
                                        </div>
                                    )}

                                    {danhSachGoiY.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-lg p-2">Gợi ý sản phẩm:</h3>
                                            {danhSachGoiY.map((item, index) => (
                                                <li 
                                                    key={index} 
                                                    className="!p-2 text-black hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => xuLyChonGoiY(item)}
                                                >
                                                    {item.tenSP}
                                                </li>
                                            ))}
                                        </div>
                                    )}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex gap-4">
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
                            onMouseEnter={() => setIsOpenUser(true)}
                            onMouseLeave={() => setIsOpenUser(false)}
                        >
                            <BiUser className="text-xl" />
                        </button>

                        {isOpenUser && (
                            <div 
                                className="absolute right-0 w-50 bg-white shadow-lg rounded-lg !p-2 z-50"
                                onMouseEnter={() => setIsOpenUser(true)}
                                onMouseLeave={() => setIsOpenUser(false)}
                            >
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
                                        <Link to="/seller/become-a-seller" className="block hover:text-emerald-600 hover:bg-gray-100 font-medium !p-3">
                                            Kênh người bán
                                        </Link>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={logout} 
                                            className="block text-left w-full hover:text-emerald-600 hover:bg-gray-100 font-medium !p-3"
                                        >
                                            Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-5 items-center !mx-auto max-w-7xl !py-4 border-t border-emerald-500">
                <div className="relative">
                    <button 
                        className="cursor-pointer flex items-center gap-3 text-white bg-emerald-500 !px-5 !py-2 rounded-xl" 
                        onMouseEnter={() => setIsOpenCategory(true)}
                        onMouseLeave={() => setIsOpenCategory(false)}
                    >
                        <BiMenu className="text-2xl" />
                        <span>Danh mục</span>
                    </button>
                    {isOpenCategory && (
                        <div 
                            className="absolute left-0 w-60 bg-white shadow-lg rounded-lg !p-2 z-50"
                            onMouseEnter={() => setIsOpenCategory(true)}
                            onMouseLeave={() => setIsOpenCategory(false)}
                        >
                            <ul>
                                {categories.map(category => (
                                    <li key={category._id} className="hover:bg-gray-100 !p-2 cursor-pointer" 
                                        onClick={() => {
                                            const nameCategory = category?.tenDM.replace(/\s+/g, '-');
                                            navigate(`/category/${nameCategory}?sort=phobien&page=1&limit=20`, {
                                                state: { id: category?._id },
                                            });
                                        }}
                                    >
                                        {category?.tenDM}
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

                    <Link to="/category/tatca">
                        <div className=" text-white hover:bg-emerald-500 !px-8 !py-2 rounded-xl">
                            Danh mục
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