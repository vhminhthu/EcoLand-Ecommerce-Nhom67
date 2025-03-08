import MainLayout from '../../layouts/customer/MainLayout'
import { useNavigate } from 'react-router-dom'
import {Reviews, product} from '../../data/product.js'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoMdHeartEmpty  } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useState } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { CiShop } from "react-icons/ci";
import { products2, products } from "../../data/home";
import ProductCard from '../../components/customer/common/cards/ProductCard.jsx';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import ReviewItem from '../../components/customer/common/items/ReviewItem.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ProductPage() {
    const navigate = useNavigate()
    const location = useLocation();
    const { id } = location.state || {};
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const [selectedSao, setSelectedSao] = useState('Tất cả');
    const [sanPham, setSanPham] = useState(null);
    const [selectedLoai, setSelectedLoai] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchProductDetails = async (id) => {
            try {
                const response = await axios.get(`/api/sanpham/lay/${id}`);
                //console.log(response.data);
                setSanPham(response.data.product);
                setIsFavorite(response.data.isFavorite);
                setSelectedLoai(response.data.product.phanLoai[0]);
                if(response.status === 200) {
                    // console.log("Tải sản phẩm thành công!");
                    await axios.put(`/api/sanpham/capnhat/luotxem/${id}`);
                }
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
            }
        };
    
        fetchProductDetails(id);
    }, [id]);
    
    //Sản phẩm của shop
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
        if (sanPhamGIndex + soSanPhamGMoiSlide < products2.length) {
            setSanPhamGIndex((prevIndex) => prevIndex + soSanPhamGMoiSlide);
        }
    };    

    //Yêu thích
    const toggleFavorite = async () => {
        try {
            await axios.patch(`/api/nguoidung/capnhat/yeuthich/${id}`);
            setIsFavorite(!isFavorite);
            //console.log(response.data.message);
        } catch (error) {
            console.error("Lỗi khi cập nhật yêu thích:", error.message);
        }
    };

    const sanPhamGHienTai = products2.slice(0, sanPhamGIndex + soSanPhamGMoiSlide);

    const handleAddToCart = async () => {
        if (!sanPham) return;
        const idLoai = selectedLoai.id; 
        if (!idLoai) {
            alert("Vui lòng chọn phân loại trước khi thêm vào giỏ hàng!");
            return;
        }
    
        const giohang = {
            idSP: sanPham._id,
            idLoai: selectedLoai.id,
            soLuong: quantity,
        };
    
        try {
            await axios.post('/api/giohang/them', giohang);
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            if (error.response && error.response.status === 403) {
                alert("Bạn không có quyền thực hiện này");
            }
        }
    };

    const handlePurchase = () => {
        const selectedItems = [{
            checked: true,
            idLoai: selectedLoai.id,  
            idSP: {
                _id: sanPham._id,
                tenSP: sanPham.tenSP,
                dsAnhSP: sanPham.dsAnhSP,
                idCH: sanPham.idCH._id,
                phanLoai: sanPham.phanLoai,
            },
            soLuong: quantity,
        }];
    
        navigate('/checkout', {
            state: {
                selectedItems,
                totalPrice: (selectedLoai?.giaLoai * (1 - selectedLoai?.khuyenMai / 100)) * quantity,
                totalQuantity: quantity
            }
        });
    };
    
    
    return (
        <MainLayout>
            <span  
                className='hover:text-emerald-600 cursor-pointer' 
                onClick={() => {navigate(`/`);}}
                >Trang chủ / </span>
            <span 
                className='hover:text-emerald-600 cursor-pointer' 
                onClick={() => {
                    const nameCategory = sanPham?.idDM?.tenDM.replace(/\s+/g, '-');
                    navigate(`/category/${nameCategory}`, {
                        state: { id: sanPham?.idDM?._id },
                    });
                }}

                >{sanPham?.idDM?.tenDM} / </span>
            <span 
                className='hover:text-emerald-600 cursor-pointer'
                onClick={() => {
                    const nameProduct = sanPham?.tenSP.replace(/\s+/g, '-');
                    navigate(`/${nameProduct}`, {
                        state: { id: sanPham?._id },
                    });
                }}
                >{sanPham?.tenSP}</span>

            <div className='flex gap-10 !mt-5'>
                <div className='w-fit flex gap-2'>
                    <div className="flex gap-2">
                        {/* <div className="flex flex-col gap-2">
                            {sanPham?.dsAnhSP.slice(1).map((anh, index) => (
                                <div  key={index} className="product-image w-16 h-16 overflow-hidden cursor-pointer hover:opacity-80">
                                    <img src={anh} alt={sanPham?.tenSP}  className=" h-full object-cover rounded-lg"/>
                                </div>
                            ))}
                        </div> */}
                        <div className="product-image w-96 h-96 overflow-hidden">
                            <img src={sanPham?.dsAnhSP} alt={sanPham?.tenSP}  className=" h-full object-cover rounded-xl"/>
                        </div>
                    </div>

                </div>
                <div className='w-2/3'>
                    <p className='text-2xl'>{sanPham?.tenSP}</p>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className='flex !my-2'>
                                {[1,2,3,4,5].map((star) => {
                                    if (star <= Math.floor(sanPham?.tongSoSao)) {
                                        return <FaStar key={star} size={20} className="text-yellow-500 !mr-1" />;
                                    } else if (star <= Math.ceil(sanPham?.tongSoSao) && sanPham?.tongSoSao % 1 !== 0) {
                                        return <FaStarHalfAlt key={star} size={20} className="text-yellow-500 !mr-1" />;
                                    } else {
                                        return <FaRegStar key={star} size={20} className="text-gray-300 !mr-1" />;
                                    }
                                })}
                                <p className='!mx-2'>{sanPham?.tongSoSao}</p>
                                <p>( {sanPham?.tongSoDanhGia} Đánh giá )</p>
                            </div>
                            <span className='text-sm text-gray-400 cursor-pointer'>Tố cáo</span>
                        </div>                    
                    </div>
                    <div className="flex gap-3 items-center !mb-3">
                        {selectedLoai && selectedLoai?.khuyenMai > 0 ? (
                            <>
                            <span className="text-red-600 font-bold text-2xl">
                                {(
                                selectedLoai?.giaLoai * (1 - selectedLoai?.khuyenMai / 100)
                                ).toLocaleString()} đ
                            </span>
                            <span className="text-gray-500 line-through text-lg">
                                {selectedLoai?.giaLoai.toLocaleString()} đ
                            </span>
                            </>
                        ) : (
                            <span className="text-2xl font-bold">{selectedLoai?.giaLoai.toLocaleString()} đ</span>
                        )}
                        <span className='border border-red-500 text-red-500 rounded-full !py-0.5 !px-3'>-{selectedLoai?.khuyenMai}%</span>
                    </div>

                    <div className='!my-3'>
                        <p className='!mb-1'>Phân loại</p>
                        {sanPham?.phanLoai.map((loai) => (
                        <button
                            key={loai.tenLoai}
                            onClick={() => setSelectedLoai(loai)} // Cập nhật loại được chọn
                            className={`text-emerald-600 !py-2 w-26 !mr-2 rounded-full border border-emerald-600 cursor-pointer 
                                ${selectedLoai?.tenLoai === loai.tenLoai 
                                    ? "bg-emerald-600 text-white cursor-default"
                                    : "hover:bg-gray-50"}`
                            }
                        >
                            {loai.tenLoai}
                        </button>
                        ))}
                    </div>
                    <div className='!my-3'>
                        <p>Số lượng</p>
                        <div className='flex gap-6 items-center !mt-1'>
                            <div className='flex border border-emerald-600 rounded-xl'>
                                <button 
                                className={`cursor-pointer hover:bg-emerald-500 w-15 !py-2 bg-emerald-600 text-white text-xl rounded-l-xl ${quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""}`} 
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                disabled={quantity <= 1}
                                >
                                -
                                </button>
                                <input 
                                className="w-15 text-center text-emerald-600 font-bold text-xl outline-none border-x border-emerald-600" 
                                value={quantity} 
                                readOnly
                                />
                                <button 
                                className='cursor-pointer hover:bg-emerald-500 w-15 !py-2 bg-emerald-600 text-white text-xl rounded-r-xl' 
                                onClick={() => setQuantity(prev => prev + 1)}
                                >
                                +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-10 !mt-10'>
                        <button 
                            className="cursor-pointer w-60 !py-4 bg-emerald-600 text-white text-xl rounded-xl hover:bg-emerald-500 hover:scale-105 transition-all duration-300 shadow-md active:scale-95 active:bg-emerald-700"
                            onClick={handleAddToCart}>
                            Thêm vào giỏ
                        </button>
                        <button className="cursor-pointer w-60 !py-4 bg-emerald-600 text-white text-xl rounded-xl 
                            hover:bg-emerald-500 hover:scale-105 transition-all duration-300 shadow-md 
                            active:scale-95 active:bg-emerald-700"
                            onClick={handlePurchase}>
                            Mua ngay
                        </button>
                        <span className='flex gap-2 items-center'>
                            {isFavorite ? (
                            <IoHeart size={30} className="text-red-400 cursor-pointer" onClick={toggleFavorite} />
                            ) : (
                            <IoMdHeartEmpty size={30} className="text-gray-400 cursor-pointer" onClick={toggleFavorite} />
                            )}
                            <span>Đã thích {sanPham?.yeuThich}</span>
                        </span>
                    </div>

                </div>
                
            </div>
            <div className='!mt-5 border border-emerald-600 rounded-xl !py-6 !px-8 flex items-center gap-10'>
                <img className="w-20 h-20 object-cover rounded-full cursor-pointer hover:opacity-80" src={product.cuaHang.anhCH} alt={product.cuaHang.tenCH}  ></img>
                <div>
                    <span className='text-xl font-bold'>{sanPham?.idCH?.tenCH}</span>
                    <div className='flex gap-2 !mt-3'>
                        <button className='cursor-pointer flex items-center text-lg gap-2 border-1 border-emerald-600 text-emerald-600 !py-1 !px-2 rounded-lg hover:bg-gray-50'><HiOutlineChatBubbleLeftRight/>Chat Ngay</button>
                        <button 
                        className='cursor-pointer flex items-center text-lg gap-2 border-1 border-emerald-600 text-emerald-600 !py-1 !px-2 rounded-lg hover:bg-gray-50'
                        onClick={() => {
                            const nameShop = product.cuaHang.tenCH.replace(/\s+/g, '-');
                            const idShop = product.cuaHang._id;
                            navigate(`/shop/${nameShop}`, {
                                state: { id: idShop },
                            });
                        }}
                        ><CiShop/>Xem Shop</button>
                    </div>
                </div>
                <span className='flex flex-col gap-2'>
                    <span className='text-gray-500'>Đánh giá <span className='text-emerald-600 !ml-5'>50</span></span>
                    <span className='text-gray-500'>Sản phẩm <span className='text-emerald-600 !ml-5'>100</span></span>
                </span>
                <span className='flex flex-col gap-2'>
                    <span className='text-gray-500'>Tham gia <span className='text-emerald-600 !ml-5'>1 năm trước</span></span>
                    <span className='text-gray-500'>Người theo dõi <span className='text-emerald-600 !ml-5'>10</span></span>
                </span>
            </div>
            <div className='!mt-10 !mb-2 text-center border-b-2 border-emerald-600 text-emerald-600 font-bold text-xl'>MÔ TẢ SẢN PHẨM</div>
            <span className='!py-5'>{sanPham?.moTaSP}</span>
            <div className='!mt-10 !mb-2 text-center border-b-2 border-emerald-600 text-emerald-600 font-bold text-xl'>ĐÁNH GIÁ SẢN PHẨM</div>
            <div className='!py-5 flex flex-col items-center'>
                <div className='flex flex-col items-center w-full bg-gray-50 !py-5'>
                    <span className='text-4xl'>{sanPham?.tongSoSao} trên 5</span>
                    <div className='flex !my-2'>
                        {[1,2,3,4,5].map((star) => {
                            if (star <= Math.floor(sanPham?.tongSoSao)) {
                                return <FaStar key={star} size={40} className="text-emerald-600 !mr-1" />;
                            } else if (star <= Math.ceil(sanPham?.tongSoSao) && sanPham?.tongSoSao % 1 !== 0) {
                                return <FaStarHalfAlt key={star} size={40} className="text-emerald-600 !mr-1" />;
                            } else {
                                return <FaRegStar key={star} size={40} className="text-gray-300 !mr-1" />;
                            }
                        })}
                    </div>
                    <div className='flex gap-3'>
                        {['Tất cả', 5, 4, 3, 2, 1].map((sao) => (
                            <button
                                key={sao}
                                onClick={() => setSelectedSao(sao)}
                                className={`cursor-pointer text-xl w-40 !py-2 border border-emerald-500 text-emerald-500 
                                    rounded-sm transition-all duration-200 
                                    ${selectedSao === sao 
                                        ? "bg-emerald-600 text-white cursor-default" 
                                        : "hover:bg-emerald-500 hover:text-white"}`}
                            >
                                {sao === 'Tất cả' ? sao : `${sao} sao`}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full px-10 py-5 flex flex-col gap-5">
                    {Reviews.filter(re => selectedSao === "Tất cả" || re.rating === selectedSao)
                        .map(re => <ReviewItem key={re.id} {...re} />)}
                </div>
                <div className='bg-gray-50 w-full h-50'>

                </div>

            </div>
            <div className='!mt-5 !mb-2 text-center border-b-2 border-emerald-600 text-emerald-600 font-bold text-xl'>CÁC SẢN PHẨM KHÁC CỦA SHOP</div>
            <div className="relative w-full flex gap-4 justify-center">
                <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full" onClick={prevSanPhamB}><FaArrowLeft/></button>
                {sanPhamBHienTai.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
                <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full" onClick={nextSanPhamB}><FaArrowRight /></button>
            </div>
            <div className='!mt-10 !mb-2 text-center border-b-2 border-emerald-600 text-emerald-600 font-bold text-xl'>CÓ THỂ BẠN CŨNG THÍCH</div>
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
        </MainLayout>
    )
}

export default ProductPage