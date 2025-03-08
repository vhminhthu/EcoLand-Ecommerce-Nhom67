import CategoryCard from "../../components/customer/common/cards/CategoryCard"
import ProductCard from "../../components/customer/common/cards/ProductCard";
import ShopCard from "../../components/customer/common/cards/ShopCard";
import MainLayout from "../../layouts/customer/MainLayout"
import { ads, products2 } from "../../data/home";

import { BiChevronRight } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/danhmuc/lay');
                setCategories(response.data); 
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy danh mục:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/sanpham/lay/tatca');
                setProducts(response.data); 
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy sản phẩm:", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await axios.get('/api/cuahang/laytatca');
                //console.log("shop",response.data);
                setShops(response.data); 
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy cửa hàng:", error);
            }
        };
        fetchShop();
    }, []);

    //Quảng cáo
    const [quangCaoIndex, setQuangCaoIndex] = useState(0);
    const nextQuangCao = () => {
        setQuangCaoIndex((prevIndex) => (prevIndex + 1) % ads.length);
    };
    const prevQuangCao = () => {
        setQuangCaoIndex((prevIndex) =>
            prevIndex === 0 ? ads.length - 1 : prevIndex - 1
        );
    };
    useEffect(() => {
        const interval = setInterval(nextQuangCao, 3000);
        return () => clearInterval(interval);
    }, []);

    //Danh mục
    const [danhMucIndex, setDanhMucIndex] = useState(0);
    const soDanhMucMoiSlide = 8;
    const nextDanhMuc = () => {
        setDanhMucIndex((prevIndex) =>
            prevIndex + soDanhMucMoiSlide >= categories.length ? 0 : prevIndex + soDanhMucMoiSlide
        );
    };
    const prevDanhMuc = () => {
        setDanhMucIndex((prevIndex) =>
            prevIndex === 0 ? categories.length - soDanhMucMoiSlide : prevIndex - soDanhMucMoiSlide
        );
    };
    const danhMucHienTai = categories.slice(danhMucIndex, danhMucIndex + soDanhMucMoiSlide);

    //Sản phảm deal
    const [sanPhamDIndex, setSanPhamDIndex] = useState(0);
    const soSanPhamDMoiSlide = 5;
    const nextSanPhamD = () => {
        setSanPhamDIndex((prevIndex) =>
            prevIndex + soSanPhamDMoiSlide >= products.length ? 0 : prevIndex + soSanPhamDMoiSlide
        );
    };
    const prevSanPhamD = () => {
        setSanPhamDIndex((prevIndex) =>
            prevIndex === 0 ? products.length - soSanPhamDMoiSlide : prevIndex - soSanPhamDMoiSlide
        );
    };
    const sanPhamDHienTai = products.slice(sanPhamDIndex, sanPhamDIndex + soSanPhamDMoiSlide);

    //Sản phẩm bán chạy
    const [sanPhamBIndex, setSanPhamBIndex] = useState(0);
    const soSanPhamBMoiSlide = 5;
    const nextSanPhamB = () => {
        setSanPhamBIndex((prevIndex) =>
            prevIndex + soSanPhamBMoiSlide >= products.length ? 0 : prevIndex + soSanPhamBMoiSlide
        );
    };
    const prevSanPhamB = () => {
        setSanPhamBIndex((prevIndex) =>
            prevIndex === 0 ? products.length - soSanPhamBMoiSlide : prevIndex - soSanPhamBMoiSlide
        );
    };
    const sanPhamBHienTai = products.slice(sanPhamBIndex, sanPhamBIndex + soSanPhamBMoiSlide);

    //Sản phẩm gợi ý
    const [sanPhamGIndex, setSanPhamGIndex] = useState(0);
    const soSanPhamGMoiSlide = 15;
    const xemThemSanPhamG = () => {
        if (sanPhamGIndex + soSanPhamGMoiSlide < products.length) {
            setSanPhamGIndex((prevIndex) => prevIndex + soSanPhamGMoiSlide);
        }
    };    
    const sanPhamGHienTai = products.slice(0, sanPhamGIndex + soSanPhamGMoiSlide);

    return (
        <MainLayout>
            <div className="relative bg-gray-200 h-150 rounded-2xl overflow-hidden">
                <img
                    src={ads[quangCaoIndex]}
                    alt="Quảng cáo"
                    className="w-full h-full object-cover transition-all duration-500"
                />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-emerald-600 text-white rounded-full px-4 py-2 w-fit">
                    <button className="text-xl cursor-pointer hover:text-gray-200" onClick={prevQuangCao}>
                        <FaChevronLeft />
                    </button>
                    <span>{quangCaoIndex + 1}/{ads.length}</span>
                    <button className="text-xl cursor-pointer hover:text-gray-200" onClick={nextQuangCao}>
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <h1 className="!mb-3 text-emerald-700 font-bold text-xl">Mua sắm theo danh mục</h1>
                <div className="relative w-full flex gap-3 justify-center ">
                    <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full"  onClick={prevDanhMuc}><FaArrowLeft/></button>
                    {danhMucHienTai.map((category) => (
                        <CategoryCard key={category._id} {...category} />
                    ))}
                    <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full"  onClick={nextDanhMuc}><FaArrowRight /></button>
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <div className="!mb-3 bg-emerald-600 !py-2 !px-5 flex items-center justify-between">
                    <h1 className="text-white text-2xl font-bold">TOP DEAL SIÊU RẺ</h1>
                    <div className="cursor-pointer flex items-center text-gray-200 hover:text-emerald-500">Xem tất cả <BiChevronRight/></div>
                </div>
                <div className="relative w-full flex gap-4 justify-center">
                    <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full" onClick={prevSanPhamD}><FaArrowLeft/></button>
                    {sanPhamDHienTai.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                    <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full" onClick={nextSanPhamD}><FaArrowRight /></button>
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <div className="!py-2 flex items-center justify-between w-full">
                    <h1 className="text-emerald-600 text-xl font-bold">Bán chạy nhất</h1>
                    <div className="cursor-pointer flex items-center text-gray-500 hover:text-emerald-500">Xem tất cả <BiChevronRight/></div>
                </div>
                <div className="relative w-full flex gap-4 justify-center">
                    <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full" onClick={prevSanPhamB}><FaArrowLeft/></button>
                    {sanPhamBHienTai.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                    <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full" onClick={nextSanPhamB}><FaArrowRight /></button>
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <div className="!py-2 flex items-center justify-between">
                    <h1 className="text-emerald-600 text-xl font-bold">Gian hàng phổ biến</h1>
                    <div className="cursor-pointer flex items-center text-gray-500 hover:text-emerald-500">Xem tất cả <BiChevronRight/></div>
                </div>
                <div className="grid grid-cols-3 gap-4 justify-center">
                {shops.map((shop) => (
                    <ShopCard key={shop._id} {...shop} />
                ))}
                </div>
            </div>

            <div className="!my-8">
                <div className="!mb-3 !py-2 !px-5 w-full flex items-center justify-between border-emerald-600 border-b-2">    
                    <h1 className="text-emerald-600 font-bold text-xl !m-auto">GỢI Ý HÔM NAY</h1>
                </div>                
                <div className="grid grid-cols-5 gap-4 justify-center">
                    {sanPhamGHienTai.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
                {sanPhamGIndex + soSanPhamGMoiSlide < products2.length && (
                    <button className="cursor-pointer text-xl bg-emerald-600/50 text-white !py-2 !px-5 rounded-xl mx-auto block mt-5" onClick={xemThemSanPhamG}>
                        Xem thêm
                    </button>
                )}
            </div>
        </MainLayout>
    )
}

export default HomePage