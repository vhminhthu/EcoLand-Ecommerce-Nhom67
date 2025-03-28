import PropTypes from 'prop-types';
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
function ShopCard(props) {
    const { _id, anhCH, tenCH, idNguoiDung, trungBinhSao, tongSoDanhGia} = props;

    ShopCard.propTypes = {
        _id: PropTypes.string,
        anhCH: PropTypes.string,
        tenCH: PropTypes.string,
        idNguoiDung: PropTypes.number,
        trungBinhSao: PropTypes.number, 
        tongSoDanhGia: PropTypes.number,
    };

    const navigate = useNavigate();

    return (
        <>
            <div 
                className="cursor-pointer category-card border-1 border-emerald-600 rounded-xl flex items-center gap-5 !px-5 !py-5 shadow-lg"
                onClick={() => {
                    const nameShop = tenCH.replace(/\s+/g, '-');
                    navigate(`/shop/${nameShop}?sort=phobien&page=1&limit=15`, {
                        state: { id: _id },
                    });
                }}
                >
                <div className="w-15 h-15 rounded-full bg-amber-50 overflow-hidden flex justify-center items-center shadow-lg">
                    <img className="w-full h-full object-cover rounded-2xl" src={anhCH || "https://img.icons8.com/dusk/64/shop.png"} alt={tenCH} />
                </div>
                <div className='gap-1 items-center'>
                    <p className="text-lg font-bold line-clamp-1">{tenCH}</p>
                    <div className='flex items-center gap-2'>
                        <p className='text-sm'><span className='text-emerald-600'>{idNguoiDung?.dsNguoiTheoDoi?.length} </span> Người theo dõi</p>
                        <p>|</p>
                        <div className="rating flex items-center gap-1 text-yellow-500 text-sm">
                            <FaStar/> <span className="font-bold">{trungBinhSao || 0}</span> 
                            <span className="text-gray-500">({tongSoDanhGia || 0})</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

        
    )
}


export default ShopCard