import PropTypes from 'prop-types';
import { MdOutlineStorefront } from "react-icons/md";
import { useState } from 'react';

function CartItem(props) {
    const { id, shopName, orderStatus, products, totalPrice, orderReceived } = props;
    
    CartItem.propTypes = {
        id: PropTypes.string.isRequired,
        shopName: PropTypes.string.isRequired,
        orderStatus: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                type: PropTypes.string,
                quantity: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
            })
        ).isRequired,
        totalPrice: PropTypes.number.isRequired,
        orderReceived: PropTypes.bool.isRequired,
    };

    const [quantity, setQuantity] = useState(1);

    return (
        <div className='bg-emerald-50'>
            <div className='p-5 flex items-center border-b-1 border-gray-600'>
                <div className='w-1/12'>
                    <input type='checkbox' />
                </div>
                <span className='w-full flex items-center '>
                    <MdOutlineStorefront/>
                    <p>BeautyOn Store</p>
                </span>
            </div>
            <div className='w-full p-5 flex items-center'>
                <div className=' w-1/12'>
                    <input type='checkbox' />
                </div>
                <div className='w-full'>
                    <p>Hộp 100 miếng toner pad Mediheal Làm Dịu,Cân bằng/Săn chắc/ Cấp Ẩm/ Sáng Da/Tẩy Tế Bào/ Mờ nếp nhăn</p>
                    <p className='w-fit'>Phân loại: Cân bằng da, làm dịu</p>
                </div>
                <div className='w-2/12'>
                    <p>500.000đ</p>
                    <p>200.000đ</p>
                </div>
                <div className='w-2/12'>
                    <div className='flex border border-emerald-600 rounded-xl'>
                        <button 
                            className={`cursor-pointer hover:bg-emerald-500 !p-2 bg-emerald-600 text-white text-xl rounded-l-xl ${quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""}`} 
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            disabled={quantity <= 1}
                            >
                            -
                        </button>
                        <input 
                            className="text-center text-emerald-600 font-bold text-xl outline-none border-x border-emerald-600" 
                            value={quantity} 
                            readOnly
                        />
                        <button 
                            className='cursor-pointer hover:bg-emerald-500 !p-2 bg-emerald-600 text-white text-xl rounded-r-xl' 
                            onClick={() => setQuantity(prev => prev + 1)}
                            >
                            +
                        </button>
                    </div>
                </div>
                <div className='w-2/12'>
                    <p>500.000đ</p>
                </div>
                <div className='w-2/12'>
                    <p>Xóa</p>
                </div>
            </div>
        </div>
        
    )
}

export default CartItem