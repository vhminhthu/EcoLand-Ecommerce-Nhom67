import MainLayout from '../../layouts/customer/MainLayout'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoMdHeartEmpty  } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useState } from "react";
import { CiShop } from "react-icons/ci";
import ProductCard from '../../components/customer/common/cards/ProductCard.jsx';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import ReviewItem from '../../components/customer/common/items/ReviewItem.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from "moment";
import "moment/locale/vi";
import { FaQrcode } from 'react-icons/fa'; 
import QRCode from 'react-qr-code'; 
import Loading from '../../components/customer/layout/Loading.jsx';

function ProductPage() {
    const navigate = useNavigate()
    const location = useLocation();
    const { id } = location.state || {};
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const [selectedSao, setSelectedSao] = useState('Tất cả');
    const [sanPham, setSanPham] = useState(null);
    const [sanPhamLienQuan, setSanPhamLienQuan] = useState([]);
    const [sanPhamGoiY, setSanPhamGoiY] = useState([]);

    const [selectedLoai, setSelectedLoai] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const tongDanhGiaCH = sanPham?.idCH?.dsSanPham?.reduce(
        (sum, sp) => sum + (sp.dsDanhGia.length || 0), 0
    );
    const danhGiaTrungBinh = sanPham?.tongSoDanhGia > 0 
    ? sanPham?.tongSoSao / sanPham?.tongSoDanhGia 
    : 0;

    const [isBaoCao, setIsBaoCao] = useState(false);
    const [baoCao, setBaoCao] = useState({
        loaiBaoCao: "",
        noiDung: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const openQRDialog = () => {
        setIsModalOpen(true);
    };
    
    const closeQRDialog = () => {
        setIsModalOpen(false);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/sanpham/lay/${id}`);
                setSanPham(res.data.product);
                setIsFavorite(res.data.isFavorite);
                setSelectedLoai(res.data.product.phanLoai[0]);
                if(res.status === 200) {
                    // console.log("Tải sản phẩm thành công!");
                    await axios.put(`/api/sanpham/capnhat/luotxem/${id}`);
                    const [res0, res1] = await Promise.all([
                        axios.get(`/api/sanpham/trelated/${res.data.product?.idCH?._id}`),
                        axios.get('/api/sanpham/suggestions'),
                    ]);
                    //console.log(res0.data)
                    setSanPhamLienQuan(res0.data)
                    setSanPhamGoiY(res1.data.data);
                }
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
        setSanPhamBIndex((prevIndex) =>{
            let newIndex = prevIndex + soSanPhamBMoiSlide;
            return newIndex >= sanPhamLienQuan.length ? 0 : newIndex;
        });
    };
    const prevSanPhamB = () => {
        setSanPhamBIndex((prevIndex) =>{
            let newIndex = prevIndex - soSanPhamBMoiSlide;
            return newIndex < 0 ? sanPhamLienQuan.length - (sanPhamLienQuan.length % soSanPhamBMoiSlide || soSanPhamBMoiSlide) : newIndex;
        });
    };
    const sanPhamBHienTai = sanPhamLienQuan.slice(sanPhamBIndex, sanPhamBIndex + soSanPhamBMoiSlide);
    
    //Sản phẩm gợi ý
    const [sanPhamGIndex, setSanPhamGIndex] = useState(0);
    const soSanPhamGMoiSlide = 10;
    const xemThemSanPhamG = () => {
        if (sanPhamGIndex + soSanPhamGMoiSlide < sanPhamGoiY.length) {
            setSanPhamGIndex((prevIndex) => prevIndex + soSanPhamGMoiSlide);
        }
    };    
    const sanPhamGHienTai = sanPhamGoiY.slice(0, sanPhamGIndex + soSanPhamGMoiSlide);

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

    const handleAddToCart = async () => {
        if (!sanPham) return;
        const idLoai = selectedLoai.idPL; 
        if (!idLoai) {
            alert("Vui lòng chọn phân loại trước khi thêm vào giỏ hàng!");
            return;
        }
    
        const giohang = {
            idSP: sanPham._id,
            idLoai: selectedLoai.idPL,
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
            idLoai: selectedLoai.idPL,  
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

    const themBaoCao = async (id) => {
        if (!baoCao.loaiBaoCao || !baoCao.noiDung.trim()) {
            alert("Vui lòng chọn lý do và nhập nội dung chi tiết!");
            return;
        }
    
        try {
            await axios.post(`/api/baocao/them/${id}`, {
                loaiBaoCao: baoCao.loaiBaoCao,
                noiDung: baoCao.noiDung,
            });
            //console.log("Báo cáo thành công:", res.data);
            setIsBaoCao(false);
            setBaoCao({ loaiBaoCao: "", noiDung: "" });
        } catch (error) {
            console.error("Lỗi khi thêm báo cáo:", error);
        }
    };
    if (loading) return <Loading />;
    if (error) return <p>Lỗi: {error.message}</p>;
    return (
    <>
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
                        <div className="product-image w-96 h-96 overflow-hidden rounded-xl">
                            <img 
                                src={sanPham?.dsAnhSP} 
                                alt={sanPham?.tenSP}  
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
                <div className='w-2/3'>
                    <p className='text-2xl'>{sanPham?.tenSP}</p>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className='flex !my-2'>
                                {[1,2,3,4,5].map((star) => {
                                    if (star <= Math.floor(danhGiaTrungBinh)) {
                                        return <FaStar key={star} size={20} className="text-yellow-500 !mr-1" />;
                                    } else if (star <= Math.ceil(danhGiaTrungBinh) && danhGiaTrungBinh % 1 !== 0) {
                                        return <FaStarHalfAlt key={star} size={20} className="text-yellow-500 !mr-1" />;
                                    } else {
                                        return <FaRegStar key={star} size={20} className="text-gray-300 !mr-1" />;
                                    }
                                })}
                                <p className='!mx-2'>{danhGiaTrungBinh}</p>
                                <p>( {sanPham?.tongSoDanhGia} Đánh giá )</p>
                            </div>
                            <span className='text-sm text-gray-400 cursor-pointer' onClick={() => setIsBaoCao(true)}>Tố cáo</span>
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
                            onClick={() => setSelectedLoai(loai)}
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
                        <FaQrcode
                                size={30}
                                className="cursor-pointer text-green-500 hover:text-green-600"
                                onClick={openQRDialog}
                        />
                    </div>
                </div>             
            </div>


            <div className='!mt-5 border border-emerald-600 rounded-xl !py-6 !px-8 flex items-center gap-10'>
                <img 
                    className="w-20 h-20 object-cover rounded-full cursor-pointer hover:opacity-80" 
                    src={sanPham?.idCH?.anhCH || "https://img.icons8.com/dusk/64/shop.png"} 
                    alt={sanPham?.idCH?.tenCH || "Cửa hàng"} 
                />
                <div>
                    <span className='text-xl font-bold'>{sanPham?.idCH?.tenCH}</span>
                    <button 
                    className='mt-3 cursor-pointer flex items-center text-lg gap-2 border-1 border-emerald-600 text-emerald-600 !py-1 !px-2 rounded-lg hover:bg-gray-50'
                    onClick={() => {
                        const nameShop = sanPham?.idCH?.tenCH.replace(/\s+/g, '-');
                        const idShop = sanPham?.idCH?._id;
                        navigate(`/shop/${nameShop}?sort=phobien&page=1&limit=15`, {
                            state: { id: idShop },
                        });
                    }}
                    ><CiShop/>Xem Shop</button>
                </div>
                <span className='flex flex-col gap-2'>
                    <span className='text-gray-500'>Đánh giá <span className='text-emerald-600 !ml-5'>{tongDanhGiaCH}</span></span>
                    <span className='text-gray-500'>Sản phẩm <span className='text-emerald-600 !ml-5'>{sanPham?.idCH?.dsSanPham?.length}</span></span>
                </span>
                <span className='flex flex-col gap-2'>
                    <span className='text-gray-500'>Tham gia <span className='text-emerald-600 !ml-5'>{moment(sanPham?.idCH?.createdAt).locale("vi").fromNow()}</span></span>
                    <span className='text-gray-500'>Người theo dõi <span className='text-emerald-600 !ml-5'>{sanPham?.idCH?.idNguoiDung?.dsNguoiTheoDoi?.length}</span></span>
                </span>
            </div>
            <div className='!mt-10 !mb-2 text-center border-b-2 border-emerald-600 text-emerald-600 font-bold text-xl'>MÔ TẢ SẢN PHẨM</div>
            <span className='!py-5'>{sanPham?.moTaSP}</span>
            <div className="flex justify-center mt-10">
                    <video 
                        src={sanPham?.video} 
                        alt={sanPham?.tenSP}  
                        className="w-[800px] h-[500px] object-cover"
                        controls
                    />
                </div>

            <div className='!mt-10 !mb-2 text-center border-b-2 border-emerald-600 text-emerald-600 font-bold text-xl'>ĐÁNH GIÁ SẢN PHẨM</div>
            <div className='!py-5 flex flex-col items-center'>
                <div className='flex flex-col items-center w-full bg-gray-50 !py-5'>
                    <span className='text-4xl'>{danhGiaTrungBinh} trên 5</span>
                    <div className='flex !my-2'>
                        {[1,2,3,4,5].map((star) => {
                            if (star <= Math.floor(danhGiaTrungBinh)) {
                                return <FaStar key={star} size={40} className="text-emerald-600 !mr-1" />;
                            } else if (star <= Math.ceil(danhGiaTrungBinh) && danhGiaTrungBinh % 1 !== 0) {
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
                    {sanPham?.dsDanhGia?.length > 0 ? (
                        sanPham?.dsDanhGia?.some(re => selectedSao === "Tất cả" || re.soSao == selectedSao) ? (
                            sanPham?.dsDanhGia.map(re =>
                                (selectedSao === "Tất cả" || re.soSao == selectedSao) && (
                                    <ReviewItem key={re._id} {...re} />
                                )
                            )
                        ) : (
                            <p className='text-center text-xl text-black'>Không có đánh giá {selectedSao} sao nào.</p>
                        )
                    ) : (
                        <p className='text-black'>Chưa có đánh giá nào.</p>
                    )}
                </div>

            </div>
            <div className='!mt-5 !mb-2 text-center border-b-2 border-emerald-600 text-emerald-600 font-bold text-xl'>CÁC SẢN PHẨM KHÁC CỦA SHOP</div>
            <div className="relative w-full flex gap-4 justify-center">
                <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full" onClick={prevSanPhamB}><FaArrowLeft/></button>
                {sanPhamBHienTai.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
                <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full" onClick={nextSanPhamB}><FaArrowRight /></button>
            </div>
            <div className='!mt-10 !mb-2 text-center border-b-2 border-emerald-600 text-emerald-600 font-bold text-xl'>CÓ THỂ BẠN CŨNG THÍCH</div>
            <div className="grid grid-cols-5 gap-4 justify-items-center">
                {sanPhamGHienTai.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </div>
            {sanPhamGIndex + soSanPhamGMoiSlide < sanPhamGoiY.length && (
                <button className="cursor-pointer text-xl bg-emerald-600/50 text-white !py-2 !px-5 rounded-xl mx-auto block mt-5" onClick={xemThemSanPhamG}>
                    Xem thêm
                </button>
            )}

            {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black/40 flex items-center justify-center z-50" onClick={closeQRDialog}>
                <div className="w-[430px] bg-white p-5 rounded-lg shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quét để xem nguồn gốc</h2>
                <QRCode
                    value={`https://frontend-tttn-t7hc.vercel.app/product/detail/${sanPham.uuid}`}
                    size={256}
                    fgColor="#000000"
                    bgColor="#ffffff"
                    className="mx-auto"
                />
                <button
                    onClick={closeQRDialog}
                    className="mt-4 py-2 px-4 w-full bg-green-600 text-white rounded-xl hover:bg-green-500"
                >
                    Đóng
                </button>
                </div>
            </div>
            )}

           {/* Chọn loại báo cáo */}
            {isBaoCao && (
                <div className='fixed top-0 left-0 w-full h-screen bg-black/40 flex items-center justify-center z-50'>
                    <div className='w-[430px] bg-white p-5 rounded-lg shadow-xl'>
                        <span className='flex items-top justify-between'>
                            <p className='text-xl font-semibold text-gray-800 mb-3'>Chọn lý do</p>
                            <p 
                                className='hover:text-red-500 cursor-pointer text-lg' 
                                onClick={() => {
                                    setIsBaoCao(false);
                                    setBaoCao({ loaiBaoCao: "", noiDung: "" });
                                }}
                            >x</p>
                        </span>
                        <p className='text-sm text-gray-600 mb-4'>Vui lòng chọn lý do bạn muốn tố cáo nội dung này.</p>
                        
                        <ul className="space-y-2 max-h-50 overflow-y-auto p-2">
                            {["Sản phẩm có dấu hiệu lừa đảo", "Hàng giả, hàng nhái", "Sản phẩm không rõ nguồn gốc, xuất xứ", "Hình ảnh sản phẩm không rõ ràng", "Tên sản phẩm không phù hợp với hình ảnh", "Sản phẩm bị cấm buôn bán"].map((item) => (
                                <li 
                                    key={item}
                                    className={`p-2 rounded cursor-pointer transition ${
                                        baoCao.loaiBaoCao === item ? "bg-emerald-200" : "bg-gray-100 hover:bg-gray-200"
                                    }`} 
                                    onClick={() => setBaoCao(prev => ({ ...prev, loaiBaoCao: item }))}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="block text-xl font-medium text-gray-700 mb-1 pt-5 mt-5 border-t">Lý do chi tiết</p>
                        <p className='text-sm text-gray-600 mb-4'>Vui lòng ghi chi tiết lý do bạn muốn tố cáo nội dung này.</p>
                        <textarea 
                            type="text" 
                            name="noiDung" 
                            value={baoCao.noiDung} 
                            onChange={(e) => {
                                if (e.target.value.length <= 200) {
                                    setBaoCao(prev => ({ ...prev, noiDung: e.target.value }));
                                }
                            }} 
                            placeholder="Nhập lý do chi tiết..."
                            className="w-93 h-30 p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            {50 - baoCao.noiDung.length} ký tự còn lại
                        </p>
                        <p className='text-center text-sm text-emerald-600'>Vui lòng chọn lý do báo cáo và Nhập lý do chi tiết</p>
                        <button
                            className={`mt-4 w-full py-2 rounded-lg transition cursor-pointer ${
                                baoCao.loaiBaoCao && baoCao.noiDung.trim() ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!baoCao.loaiBaoCao || !baoCao.noiDung.trim()}
                            onClick={() => themBaoCao(id)}
                        >
                            Gửi báo cáo
                        </button>
                    </div>
                </div>
            )}

        </MainLayout>


       </> 
    )
}

export default ProductPage


