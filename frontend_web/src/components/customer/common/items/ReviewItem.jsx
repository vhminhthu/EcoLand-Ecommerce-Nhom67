import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ReviewItem(props) {
    const {id, avatar, username, rating, date, category, content} = props;
    
    ReviewItem.propTypes = {
        id: PropTypes.string,
        avatar: PropTypes.string, 
        username: PropTypes.string, 
        rating: PropTypes.number, 
        date: PropTypes.string, 
        category: PropTypes.string, 
        content: PropTypes.string, 
    };
    
    return (
        <div key={id} className="border border-emerald-600 w-full h-fit flex items-center gap-5 !py-3 !px-5 rounded-xl shadow-lg">
            <div className="w-30 h-30 rounded-full overflow-hidden !p-2">
                <img src={avatar} alt={username} className="w-full h-full object-cover rounded-full bg-green-300"/>
            </div>
            <div>
                <p className='font-medium text-lg'>{username}</p>
                <div className='flex my-1'>
                    {[1,2,3,4,5].map((star) => {
                        if (star <= Math.floor(rating)) {
                            return <FaStar key={star} size={20} className="text-yellow-300 !mr-1" />;
                        } else if (star <= Math.ceil(rating) && rating % 1 !== 0) {
                            return <FaStarHalfAlt key={star} size={20} className="text-yellow-300 !mr-1" />;
                        } else {
                            return <FaRegStar key={star} size={20} className="text-gray-300 !mr-1" />;
                        }
                    })}
                </div>
                <span className='text-sm text-gray-400'>{date} | Phân loại: {category} </span>
                <p className='!mt-3'>{content}</p>
            </div>
        </div>
    )
}

export default ReviewItem