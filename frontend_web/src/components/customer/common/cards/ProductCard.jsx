import PropTypes from 'prop-types';
import { BiStoreAlt } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

function ProductCard(props) {
    const { _id, dsAnhSP, phanLoai, tenSP, nguonGoc } = props;

    ProductCard.propTypes = {
        _id: PropTypes.string.isRequired,
        dsAnhSP: PropTypes.string.isRequired, 
        phanLoai: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                tenLoai: PropTypes.string.isRequired,
                giaLoai: PropTypes.number.isRequired,
                donVi: PropTypes.string.isRequired,
                khuyenMai: PropTypes.number,
                khoHang: PropTypes.number,
            })
        ).isRequired,
        tenSP: PropTypes.string.isRequired, 
        nguonGoc: PropTypes.string.isRequired 
    };

    const navigate = useNavigate();

    return (
        <div 
            className="cursor-pointer product-card bg-white rounded-xl shadow-md w-auto border-1 border-emerald-600"
            onClick={() => {
                const nameProduct = tenSP.replace(/\s+/g, '-');
                navigate(`/${nameProduct}`, {
                    state: { id: _id },
                });
            }}
            key={_id}
        >
            <div className='relative'>
                {phanLoai && phanLoai.length > 0 && phanLoai[0].khuyenMai > 0 && (
                    <div className="discount-badge bg-red-500 text-white text-sm font-bold !px-3 !py-1 rounded-tr-xl absolute top-0 right-0">
                        -{phanLoai[0].khuyenMai}%
                    </div>
                )}
            </div>

            <div className="product-image w-full h-55 rounded-xl overflow-hidden !p-2">
                <img src={dsAnhSP} alt={tenSP} className="w-full h-full object-cover rounded-xl bg-green-300"/>
            </div>

            <div className="!mx-2 shop-info text-gray-500 text-sm mt-2 flex items-center gap-1">
                <span className="icon"><BiStoreAlt/></span>
                <span>Rau xanh</span>
            </div>

            <h2 className="!px-2 product-title font-bold !mt-1 line-clamp-2">
                {tenSP}
            </h2>

            <div className='!mx-2 flex items-center gap-2 !mt-2 justify-between'>
                <div className="price-info flex flex-col mt-1">
                    {phanLoai && phanLoai.length > 0 && phanLoai[0].khuyenMai > 0 ? (
                        <>
                            <span className="old-price text-gray-400 line-through text-xs">
                                {phanLoai[0].giaLoai.toLocaleString()}đ/Kg
                            </span>
                            <span className="new-price text-red-500 font-bold">
                                {(
                                    phanLoai[0].giaLoai * (1 - phanLoai[0].khuyenMai / 100)
                                ).toLocaleString()}đ/Kg
                            </span>
                        </>
                    ) : (
                        <span className="old-price text-red-500 font-bold">
                            {phanLoai && phanLoai.length > 0 ? phanLoai[0].giaLoai.toLocaleString() : '0'}đ/Kg
                        </span>
                    )}
                </div>

                <button className="add-to-cart bg-emerald-500 text-white flex items-center justify-center !px-2 !py-2 rounded-lg font-bold w-auto text-sm">
                    Thêm vào giỏ
                </button>
            </div>

            <div className='!mx-2 flex justify-between items-center !mt-2 !mb-2'>
                <div className="rating flex items-center gap-1 text-yellow-500 text-sm mt-1">
                    <FaStar/> <span className="font-bold">5</span> 
                    <span className="text-gray-500">(10)</span>
                </div>

                <div className="location flex gap-1 items-center text-gray-500 text-sm mt-1">
                    <HiOutlineLocationMarker/> <span>{nguonGoc}</span>
                </div>
            </div>

        </div>
    )
}

export default ProductCard;
