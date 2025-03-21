import MainLayout from '../../layouts/customer/MainLayout'
import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import ProductCard from '../../components/customer/common/cards/ProductCard';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/dist/locale/vi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function ShopPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const [shop, setShop] = useState(null);
    const [daTheoDoi, setDaTheoDoi] = useState(false);
    const [thoiGianThamGia, setThoiGianThamGia] = useState("");
    const [slTheoDoi, setSlTheoDoi] = useState(0);

    const query = new URLSearchParams(window.location.search); 
    const page = parseInt(query.get('page')) || 1;
    const sort = query.get('sort') || 'phobien';
    const limit = query.get('limit') || 20;

    const [products, setProducts] = useState([]);
    const [tongPages, setTongPages] = useState(1);

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res0, res1] = await Promise.all([
                    axios.get(`/api/quangcao/lay/dangdienra/${id}`),
                    axios.get('/api/sanpham/lay/tatca'),
                ]);
                setAds(res0.data);
                setProducts(res1.data);
                //console.log("quảng cáo", res0.data)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (!id) return;
        const fetchShopDetails = async (id) => {
            try {
                const response = await axios.get(`/api/cuahang/lay/${id}`);
                console.log(response.data)
                setShop(response.data);
                setDaTheoDoi(response.data.daTheoDoi)
                setSlTheoDoi(response.data.idNguoiDung.dsNguoiTheoDoi.length)
                if (response.data.createdAt) {
                    moment.locale("vi");
                    const timeDiff = moment(response.data.createdAt).fromNow();
                    setThoiGianThamGia(timeDiff);
                }
            } catch (error) {
                console.error("Lỗi khi tải cửa hàng:", error);
            }
        };
    
        fetchShopDetails(id);
    }, [id]);

    useEffect(() => {
        const fetchProducts = async () => {
            try { 
                const responsesp = await axios.get(`/api/sanpham/lay/cuahang/sp?sort=${sort}&page=${page}&limit=${limit}&cuahang=${id}`);
                //console.log(responsesp.data.sp);
                setProducts(responsesp.data.sp);
                setTongPages(responsesp.data.tongPage);
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy sản phẩm:", error);
            }
        };
        fetchProducts();
    }, [id, sort, page, limit]);

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
    
    const filterOptions = [
        { label: "Phổ biến", value: "phobien" },
        { label: "Bán chạy", value: "banchay" },
        { label: "Hàng mới", value: "hangmoi" },
        { label: "Giá thấp đến cao", value: "giatang" },
        { label: "Giá cao đến thấp", value: "giagiam" }
    ];

    const handleSortChange = (newSort) => {
        navigate(`?sort=${newSort}&page=1&limit=15`, {
            state: {
                id: id,
            }
        });
    };

    const handlePageChange = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        
        searchParams.set("page", newPage);
        
        navigate(`${location.pathname}?${searchParams.toString()}`, {
            state: { id: id }
        });
    };

    const theoDoi = async () => {
        try {
            const response = await axios.post(`/api/cuahang/theodoi/${id}`);
            if (response.status === 200) {
                alert(response.data.message);
                setDaTheoDoi(prev => !prev);
                setSlTheoDoi(prev => response.data.message === "Đã bỏ theo dõi" ? prev - 1 : prev + 1);
            }
        } catch (error) {
            alert("Đặt hàng thất bại!");
            console.error("Lỗi khi đặt hàng", error);
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi: {error.message}</p>;
    
    return (
        <MainLayout>
            <div className='flex gap-5'>
                <div className='bg-emerald-600 shadow w-2/5 rounded-l-2xl py-3 px-5 flex items-center gap-4'>
                    <div className="w-30 h-30 rounded-full overflow-hidden !p-2">
                    <img 
                        className="w-20 h-20 object-cover rounded-full cursor-pointer hover:opacity-80 bg-emerald-50" 
                        src={shop?.anhCH || "https://img.icons8.com/dusk/64/shop.png"} 
                        alt={shop?.tenCH || "Cửa hàng"} 
                    />
                    </div>

                    <div className='flex flex-col'>
                        <p className='text-2xl font-bold mb-3 text-white'>{shop?.tenCH}</p>
                        <button 
                            className={`flex items-center gap-3 px-5 py-2 border-2 rounded-lg cursor-pointer 
                                ${daTheoDoi 
                                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                                    : "bg-white text-emerald-500 border-emerald-500 hover:bg-emerald-500 hover:text-white"
                                }`}
                            onClick={() => theoDoi()}
                        >
                            <FiPlus /> {daTheoDoi ? "Hủy theo dõi" : "Theo dõi"}
                        </button>
                    </div>
                </div>
                <div className='bg-emerald-600 shadow w-3/5 rounded-r-2xl grid grid-cols-2 grid-rows-2 p-10'>
                    <span className='row-span-1 col-start-1 col-end-2'>
                        <span className='mr-5 text-xl text-emerald-300'>Số lượng đánh giá</span>
                        <span className='text-xl text-white'>{shop?.tongSoDanhGia}</span>
                    </span>
                    <span className='row-span-1 col-start-2 col-end-3'>
                        <span className='mr-5 text-xl text-emerald-300'>Tham gia</span>
                        <span className='text-xl text-white'>{thoiGianThamGia}</span>
                    </span>
                    <span className='row-span-2 col-start-1 col-end-2'>
                        <span className='mr-5 text-xl text-emerald-300'>Sản phẩm</span>
                        <span className='text-xl text-white'>{shop?.tongSanPham}</span>
                    </span>
                    <span className='row-span-2 col-start-2 col-end-3'>
                        <span className='mr-5 text-xl text-emerald-300'>Người theo dõi</span>
                        <span className='text-xl text-white'>{slTheoDoi}</span>
                    </span>
                </div>
            </div>
            {ads.length > 0 && (
                <div className="relative mt-5 bg-gray-200 h-100 rounded-2xl overflow-hidden">
                        <img
                            src={ads[quangCaoIndex]?.linkAnh || "/default-image.jpg"}
                            alt="Quảng cáo"
                            className="w-full h-full object-cover transition-all duration-500"
                        />

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
            )}
            <div className='bg-emerald-600 shadow w-full rounded-2xl py-5 px-5 mt-5'>
                <div className='pb-3 border-b border-white'>
                    <span className='text-white text-xl font-bold'>SẢN PHẨM CỦA CỬA HÀNG</span>
                </div>
                <div>
                    {filterOptions.map(({ label, value }) => (
                        <button 
                            key={value} 
                            className={`px-7 py-3 mt-3 mr-10 text-lg cursor-pointer rounded-xl hover:text-emerald-600 hover:bg-white ${sort === value ? 'bg-white text-emerald-600' : 'text-white'}`}
                            onClick={() => handleSortChange(value)}
                            >{label}</button>
                    ))}
                </div>
            </div>
            <div className="!my-8">              
                <div className="grid grid-cols-5 gap-4 justify-items-center">
                    {products.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
                <div className="flex justify-center items-center mt-6 mb-10">
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
            </div>
        </MainLayout>
    )
}

export default ShopPage