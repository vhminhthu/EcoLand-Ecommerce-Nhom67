import MainLayout from '../../layouts/customer/MainLayout'
import { FiPlus } from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";
import { useState, useEffect } from "react";
import { ads, products2 } from "../../data/home";
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import ProductCard from '../../components/customer/common/cards/ProductCard';

function ShopPage() {
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

    //Sản phẩm gợi ý
    const [sanPhamGIndex, setSanPhamGIndex] = useState(0);
    const soSanPhamGMoiSlide = 15;
    const xemThemSanPhamG = () => {
        if (sanPhamGIndex + soSanPhamGMoiSlide < products2.length) {
            setSanPhamGIndex((prevIndex) => prevIndex + soSanPhamGMoiSlide);
        }
    };    
    const sanPhamGHienTai = products2.slice(0, sanPhamGIndex + soSanPhamGMoiSlide);
    return (
        <MainLayout>
            <div className='flex gap-5'>
                <div className='bg-emerald-600 shadow w-2/5 rounded-l-2xl py-3 px-5 flex items-center gap-4'>
                    <div className="w-30 h-30 rounded-full overflow-hidden !p-2">
                        <img className="w-full h-full object-cover rounded-full bg-green-300"/>
                    </div>
                    <div>
                        <p className='text-2xl font-bold mb-3 text-white'>Tên cửa hàng</p>
                        <div className='flex gap-3'>
                            <button
                                className='flex items-center gap-3 bg-white px-5 py-2 border-2 border-emerald-500 text-emerald-500 rounded-lg cursor-pointer'>
                                    <FiPlus/> Theo dõi
                            </button>
                            <button 
                                className='flex items-center gap-3 bg-amber-50  px-5 py-2 border-2 border-emerald-500 text-emerald-500 rounded-lg cursor-pointer'>
                                <CiChat1/>Chat
                            </button>
                        </div>
                    </div>
                </div>
                <div className='bg-emerald-600 shadow w-3/5 rounded-r-2xl grid grid-cols-2 grid-rows-2 p-10'>
                    <span className='row-span-1 col-start-1 col-end-2'>
                        <span className='mr-5 text-xl text-emerald-300'>Đánh giá</span>
                        <span className='text-xl text-white'>50</span>
                    </span>
                    <span className='row-span-1 col-start-2 col-end-3'>
                        <span className='mr-5 text-xl text-emerald-300'>Tham gia</span>
                        <span className='text-xl text-white'>1 năm trước</span>
                    </span>
                    <span className='row-span-2 col-start-1 col-end-2'>
                        <span className='mr-5 text-xl text-emerald-300'>Sản phẩm</span>
                        <span className='text-xl text-white'>100</span>
                    </span>
                    <span className='row-span-2 col-start-2 col-end-3'>
                        <span className='mr-5 text-xl text-emerald-300'>Người theo dõi</span>
                        <span className='text-xl text-white'>1000</span>
                    </span>
                </div>
            </div>
            <div className="relative mt-5 bg-gray-200 h-100 rounded-2xl overflow-hidden">
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
            <div className='bg-emerald-600 shadow w-full rounded-2xl py-5 px-5 mt-5'>
                <div className='flex justify-between items-center pb-3 border-b border-white'>
                    <span className='text-white text-xl font-bold'>SẢN PHẨM CỦA CỬA HÀNG</span>
                    <div className="flex items-center shadow text-white border border-white rounded-lg !px-4 !py-1 w-100 h-12">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm sản phẩm tại cửa hàng..." 
                            className="w-full placeholder-white !px-2 text-sm h-10 bg-transparent focus:outline-none"
                        />
                        <BiSearch />
                    </div>
                </div>
                <div>
                    {['Phổ biến', 'Bán chạy', 'Hàng mới', 'Gía thấp đến cao', 'Gía cao đến thấp'].map(filterOption => (
                        <button key={filterOption} className='px-7 py-3 mt-3 mr-10 text-lg cursor-pointer rounded-xl text-white hover:text-emerald-600 hover:bg-white'>{filterOption}</button>
                    ))}
                </div>
            </div>
            <div className="!my-8">              
                <div className="grid grid-cols-5 gap-4 justify-center">
                    {sanPhamGHienTai.map((product) => (
                        <ProductCard key={product.id} {...product} />
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

export default ShopPage