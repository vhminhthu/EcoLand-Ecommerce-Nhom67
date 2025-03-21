import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/customer/MainLayout';
import CustomerLayout from '../../layouts/customer/CustomerLayout';
import axios from 'axios';
import ProductCard from '../../components/customer/common/cards/ProductCard';
import {  useNavigate } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search); 
    const page = parseInt(query.get('page')) || 1;
    const sort = query.get('sort') || 'phobien';
    const limit = query.get('limit') || 20;
    const [tongPages, setTongPages] = useState(1);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`/api/nguoidung/lay/yeuthich?sort=${sort}&page=${page}&limit=${limit}`);
                console.log("yêu thích",response.data.dsYeuThich)
                setWishlist(response.data.dsYeuThich);
                setTongPages(response.data.tongPage)
            } catch (error) {
                console.error("Lỗi khi lấy danh sách yêu thích:", error);
            }
        };
        fetchWishlist();
    }, [sort, page, limit]);

    const handlePageChange = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", newPage);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };
    return (
        <MainLayout>
            <CustomerLayout>
                <h2 className="text-2xl font-bold mb-4 uppercase">Danh sách yêu thích </h2>
                <div>              
                {wishlist.length === 0 ? (
                    <p>Danh sách yêu thích trống.</p>
                ) : (
                    <div>
                        <p className='text-lg mb-5'>Có {wishlist.length} sản phẩm yêu thích</p>
                        <div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                                {wishlist.map((sp) => (
                                    <ProductCard key={sp._id} {...sp} />
                                ))}
                            </div>
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
                )}
                </div>
            </CustomerLayout>
        </MainLayout>
    );
}

export default WishlistPage;
