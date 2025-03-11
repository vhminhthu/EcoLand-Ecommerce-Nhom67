import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import moment from "moment";
import "moment/locale/vi";

function ReviewItem(props) {
    const {_id, soSao, tenLoai, createdAt, khachHangId, noiDung} = props;

    const formattedDate = moment().diff(moment(createdAt), "hours") < 24
    ? moment(createdAt).locale("vi").fromNow()
    : moment(createdAt).format("DD/MM/YYYY HH:mm");

    return (
        <div key={_id} className="border border-emerald-600 w-full h-fit flex items-center gap-5 !py-3 !px-5 rounded-xl shadow-lg">
            <div className="w-30 h-30 rounded-full overflow-hidden !p-2">
                <img src={khachHangId?.anhND} alt={khachHangId?.tenNguoiDung} className="w-full h-full object-cover rounded-full bg-green-300"/>
            </div>
            <div>
                <p className='font-medium text-lg'>{khachHangId?.tenNguoiDung}</p>
                <div className='flex my-1'>
                    {[1,2,3,4,5].map((star) => {
                        if (star <= Math.floor(soSao)) {
                            return <FaStar key={star} size={20} className="text-yellow-300 !mr-1" />;
                        } else if (star <= Math.ceil(soSao) && soSao % 1 !== 0) {
                            return <FaStarHalfAlt key={star} size={20} className="text-yellow-300 !mr-1" />;
                        } else {
                            return <FaRegStar key={star} size={20} className="text-gray-300 !mr-1" />;
                        }
                    })}
                </div>
                <span className='text-sm text-gray-400'>{formattedDate} | Phân loại: {tenLoai} </span>
                <p className='!mt-3'>{noiDung}</p>
            </div>
        </div>
    )
}

ReviewItem.propTypes = {
    _id: PropTypes.string.isRequired,
    soSao: PropTypes.number,
    tenLoai: PropTypes.string,
    createdAt: PropTypes.string,
    khachHangId: PropTypes.shape({
        anhND: PropTypes.string,
        tenNguoiDung: PropTypes.string,
    }),
    noiDung: PropTypes.string,
};

export default ReviewItem