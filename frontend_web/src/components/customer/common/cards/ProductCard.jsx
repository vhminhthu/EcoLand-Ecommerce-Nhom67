import PropTypes from 'prop-types';
import { BiStoreAlt, BiBasket  } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

function ProductCard(props) {
    const {id, image, discount, shopName, title, oldPrice, newPrice, rating, reviews, location  } = props;

    ProductCard.propTypes = {
        id: PropTypes.string,
        image: PropTypes.string, 
        discount: PropTypes.number, 
        shopName: PropTypes.string, 
        title: PropTypes.string, 
        oldPrice: PropTypes.string, 
        newPrice: PropTypes.string, 
        rating: PropTypes.number, 
        reviews: PropTypes.number, 
        location: PropTypes.string 
    };

    const navigate = useNavigate();

    return (
        <>
        <div 
            className="cursor-pointer product-card bg-white rounded-xl shadow-md p-3 relative w-auto border-1 border-emerald-600"
            onClick={() => {
                const nameProduct = title.replace(/\s+/g, '-');
                navigate(`/${nameProduct}`, {
                    state: { id: id },
                });
            }}
            >
            {discount && (
                <div className="discount-badge bg-red-500 text-white text-sm font-bold !px-3 !py-1 rounded-tr-xl absolute top-0 right-0">
                    -{discount}%
                </div>
            )}

            <div className="product-image w-full h-55 rounded-xl overflow-hidden !p-2 bg-amber-50">
                <img src={image} alt={title} className="w-full h-full object-cover rounded-xl bg-green-300"/>
            </div>

            <div className="!mx-2 shop-info text-gray-500 text-sm mt-2 flex items-center gap-1">
                <span className="icon"><BiStoreAlt/></span>
                <span>{shopName}</span>
            </div>

            <h2 className="!px-2 product-title font-bold !mt-1 line-clamp-2">
                {title}
            </h2>

            <div className='!mx-2 flex items-center gap-2 !mt-2 justify-between'>
                <div className="price-info flex flex-col mt-1">
                    <span className="old-price text-gray-400 line-through text-xs">{oldPrice}đ/Kg</span>
                    <span className="new-price text-red-500 font-bold">{newPrice}đ/Kg</span>
                </div>

                <button className="add-to-cart bg-emerald-500 text-white flex items-center justify-center gap-1 !px-2 !py-2 rounded-lg font-bold w-auto text-sm">
                    <BiBasket/>Thêm vào giỏ
                </button>
            </div>

            <div className='!mx-2 flex justify-between items-center !mt-2 !mb-2'>
                <div className="rating flex items-center gap-1 text-yellow-500 text-sm mt-1">
                    <FaStar/> <span className="font-bold">{rating}</span> 
                    <span className="text-gray-500">({reviews})</span>
                </div>

                <div className="location flex gap-1 items-center text-gray-500 text-sm mt-1">
                    <HiOutlineLocationMarker/> <span>{location}</span>
                </div>
            </div>

        </div>
        </>

        
    )
}


export default ProductCard