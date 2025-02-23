import PropTypes from 'prop-types';

function PurchaseItem(props) {
    const { id, shopName, orderStatus, products, totalPrice, orderReceived } = props;

    PurchaseItem.propTypes = {
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

    return (
        <div key={id} className='border border-emerald-600 shadow rounded-xl p-3'>
            <div className='flex justify-between border-b-1 border-emerald-600 pb-3'>
                <div className='flex gap-3 items-center'>
                    <h3 className='font-medium'>{shopName}</h3>
                    <button className='px-3 py bg-gray-100 border border-emerald-600 text-emerald-600 rounded-sm'>Chat</button>
                    <button className='px-3 py bg-gray-100 border border-emerald-600 text-emerald-600 rounded-sm'>Xem Shop</button>
                </div>
                <span className='uppercase text-emerald-500'>{orderStatus}</span>
            </div>
            <div className='border-b-1 border-emerald-600 pb-3'>
            {products.map((product, index) => (
                <div key={index} className='border-b border-gray-200 flex'>
                    <div className='w-fit'></div>
                    <div className='w-full'>
                        <p className='font-medium'>{product.name}</p>
                        <p className='text-gray-500'>Phân loại: {product.type}</p>
                        <p className='text-gray-500 text-sm'>x{product.quantity}</p>
                    </div>
                    <div className='w-fit'>{product.price.toLocaleString()}đ</div>
                </div>
            ))}
            </div>
            <p className='flex justify-end'>Tổng tiền: <span className='ml-2 text-2xl text-emerald-600 font-bold'>{totalPrice.toLocaleString()}đ</span></p>
            <span className='flex justify-end mt-3'>
                <button 
                    disabled={orderReceived}
                    className='border border-emerald-600 text-emerald-600 font-medium px-5 py-2 rounded-xl'
                    >
                    {orderReceived ? 'Đã nhận hàng' : 'Nhận hàng'}
                </button>
            </span>
        </div>
    );
}

export default PurchaseItem;
