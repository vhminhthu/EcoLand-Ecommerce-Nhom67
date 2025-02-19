import PropTypes from 'prop-types';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
function ShopCard(props) {
    const { id, img, shopName, location, followers, rating, reviews} = props;

    ShopCard.propTypes = {
        id: PropTypes.string,
        img: PropTypes.string,
        shopName: PropTypes.string,
        location: PropTypes.string,
        followers: PropTypes.number,
        rating: PropTypes.number, 
        reviews: PropTypes.number,
    };

    const navigate = useNavigate();

    return (
        <>
            <div 
                className="cursor-pointer category-card border-1 border-emerald-600 rounded-xl flex items-center gap-5 !px-5 !py-2 shadow-lg"
                onClick={() => {
                    const nameShop = shopName.replace(/\s+/g, '-');
                    navigate(`/shop/${nameShop}`, {
                        state: { id: id },
                    });
                }}
                >
                <div className="w-20 h-20 rounded-full bg-amber-50 overflow-hidden flex justify-center items-center shadow-lg">
                    <img className="w-full h-full object-cover rounded-2xl" src={img} alt={shopName} />
                </div>
                <div className='grid grid-rows-3 gap-1 items-center'>
                    <p className="text-lg font-bold line-clamp-1">{shopName}</p>
                    <div className='bg-emerald-600 text-white flex items-center gap-2 !px-2 !py-1 rounded-full font-medium w-auto text-medium w-fit'>
                        <HiOutlineLocationMarker/>
                        <p>{location}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-sm'><span className='text-emerald-600'>{followers} </span> Người theo dõi</p>
                        <p>|</p>
                        <div className="rating flex items-center gap-1 text-yellow-500 text-sm">
                            <FaStar/> <span className="font-bold">{rating}</span> 
                            <span className="text-gray-500">({reviews})</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

        
    )
}


export default ShopCard