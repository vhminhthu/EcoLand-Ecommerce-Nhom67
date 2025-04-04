import CategoryCard from "../../components/customer/common/cards/CategoryCard"
import ProductCard from "../../components/customer/common/cards/ProductCard";
import ShopCard from "../../components/customer/common/cards/ShopCard";
import MainLayout from "../../layouts/customer/MainLayout"

import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/customer/layout/Loading";

function HomePage() {
    const [ads, setAds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productTopDeal, setProductTopDeal] = useState([]);
    const [productTopSelling, setProductTopSelling] = useState([]);
    const [productSuggestions, setProductSuggestions] = useState([]);

    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res0, res1, res2, res3, res4, res5] = await Promise.all([
                    axios.get('/api/quangcao/admin/lay/dangdienra'),
                    axios.get('/api/danhmuc/lay'),
                    axios.get('/api/sanpham/top-deal'),
                    axios.get('/api/sanpham/top-selling'),
                    axios.get('/api/sanpham/suggestions'),
                    axios.get('/api/cuahang/popular-shop'),

                ]);
                setAds(res0.data);
                setCategories(res1.data);
                setProductTopDeal(res2.data.data);
                setProductTopSelling(res3.data.data);
                setProductSuggestions(res4.data.data);
                setShops(res5.data.usersWithStores);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //Quảng cáo
    const [quangCaoIndex, setQuangCaoIndex] = useState(0);
    const nextQuangCao = () => {
        if (ads.length === 0) return;
        setQuangCaoIndex((prevIndex) => (prevIndex + 1) % ads.length);
    };
    const prevQuangCao = () => {
        if (ads.length === 0) return;
        setQuangCaoIndex((prevIndex) =>
            prevIndex === 0 ? ads.length - 1 : prevIndex - 1
        );
    };
    useEffect(() => {
        if (ads.length === 0) return;
        const interval = setInterval(nextQuangCao, 3000);
        return () => clearInterval(interval);
    }, [ads]);

    //Danh mục
    const [danhMucIndex, setDanhMucIndex] = useState(0);
    const soDanhMucMoiSlide = 8;

    const nextDanhMuc = () => {
        setDanhMucIndex((prevIndex) => {
            let newIndex = prevIndex + soDanhMucMoiSlide;
            return newIndex >= categories.length ? 0 : newIndex;
        });
    };

    const prevDanhMuc = () => {
        setDanhMucIndex((prevIndex) => {
            let newIndex = prevIndex - soDanhMucMoiSlide;
            return newIndex < 0 ? categories.length - (categories.length % soDanhMucMoiSlide || soDanhMucMoiSlide) : newIndex;
        });
    };

    const danhMucHienTai = categories.slice(danhMucIndex, danhMucIndex + soDanhMucMoiSlide);

    //Sản phảm deal
    const [sanPhamDIndex, setSanPhamDIndex] = useState(0);
    const soSanPhamDMoiSlide = 5;
    const nextSanPhamD = () => {
        setSanPhamDIndex((prevIndex) => {
            let newIndex = prevIndex + soDanhMucMoiSlide;
            return newIndex >= productTopDeal.length ? 0 : newIndex;
        });
    };
    const prevSanPhamD = () => {
        setSanPhamDIndex((prevIndex) =>{
            let newIndex = prevIndex - soDanhMucMoiSlide;
            return newIndex < 0 ? productTopDeal.length - (productTopDeal.length % soDanhMucMoiSlide || soDanhMucMoiSlide) : newIndex;
        });
    };
    const sanPhamDHienTai = productTopDeal.slice(sanPhamDIndex, sanPhamDIndex + soSanPhamDMoiSlide);

    //Sản phẩm bán chạy
    const [sanPhamBIndex, setSanPhamBIndex] = useState(0);
    const soSanPhamBMoiSlide = 5;
    const nextSanPhamB = () => {
        setSanPhamBIndex((prevIndex) =>{
            let newIndex = prevIndex + soDanhMucMoiSlide;
            return newIndex >= productTopSelling.length ? 0 : newIndex;
        });
    };
    const prevSanPhamB = () => {
        setSanPhamBIndex((prevIndex) =>{
            let newIndex = prevIndex - soDanhMucMoiSlide;
            return newIndex < 0 ? productTopSelling.length - (productTopSelling.length % soDanhMucMoiSlide || soDanhMucMoiSlide) : newIndex;
        });
    };
    const sanPhamBHienTai = productTopSelling.slice(sanPhamBIndex, sanPhamBIndex + soSanPhamBMoiSlide);

    //Sản phẩm gợi ý
    const [sanPhamGIndex, setSanPhamGIndex] = useState(0);
    const soSanPhamGMoiSlide = 10;
    const xemThemSanPhamG = () => {
        if (sanPhamGIndex + soSanPhamGMoiSlide < productSuggestions.length) {
            setSanPhamGIndex((prevIndex) => prevIndex + soSanPhamGMoiSlide);
        }
    };    
    const sanPhamGHienTai = productSuggestions.slice(0, sanPhamGIndex + soSanPhamGMoiSlide);

    if (loading) return <Loading />;
    if (error) return <p>Lỗi: {error.message}</p>;
    return (
        <MainLayout>
            <div className="relative bg-gray-200 h-150 rounded-2xl overflow-hidden">
                {ads.length > 0 && (
                    <img
                        src={ads[quangCaoIndex]?.linkAnh || "/default-image.jpg"}
                        alt="Quảng cáo"
                        className="w-full h-full object-cover transition-all duration-500"
                    />
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-emerald-600 text-white rounded-full px-4 py-2 w-fit">
                    <button
                        className={`text-xl cursor-pointer hover:text-gray-200 ${
                            ads.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={prevQuangCao}
                        disabled={ads.length <= 1}
                    >
                        <FaChevronLeft />
                    </button>

                    <span>{quangCaoIndex + 1}/{ads.length}</span>

                    <button
                        className={`text-xl cursor-pointer hover:text-gray-200 ${
                            ads.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={nextQuangCao}
                        disabled={ads.length <= 1}
                    >
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
                </div>
                <div className="grid grid-cols-3 gap-4 justify-center">
                {shops.map((shop, index) => (
                    <ShopCard key={index} {...shop?.cuaHang} />
                ))}
                </div>
            </div>

            <div className="!my-8">
                <div className="!mb-3 !py-2 !px-5 w-full flex items-center justify-between border-emerald-600 border-b-2">    
                    <h1 className="text-emerald-600 font-bold text-xl !m-auto">GỢI Ý HÔM NAY</h1>
                </div>                
                <div className="grid grid-cols-5 gap-4 justify-items-center">
                    {sanPhamGHienTai.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
                {sanPhamGIndex + soSanPhamGMoiSlide < productSuggestions.length && (
                    <button className="cursor-pointer text-xl bg-emerald-600/50 text-white !py-2 !px-5 rounded-xl mx-auto block mt-5" onClick={xemThemSanPhamG}>
                        Xem thêm
                    </button>
                )}
            </div>
        </MainLayout>
    )
}

export default HomePage