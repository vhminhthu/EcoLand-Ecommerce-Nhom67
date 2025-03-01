import PropTypes from 'prop-types';

function CartItemProduct({ sanPham, onUpdateQuantity, onRemoveItem, onSelectItem, selectedItems }) {
    if (!sanPham) return null;

    const { idSP, idLoai, soLuong } = sanPham;
    const phanLoai = idSP?.phanLoai?.find(loai => loai.id === idLoai);

    if (!phanLoai) return null;

    const { tenLoai, giaLoai, khuyenMai } = phanLoai;
    const giaSauKhuyenMai = giaLoai * (1 - khuyenMai / 100);
    const isChecked = selectedItems.some(item => 
        item.idSP._id === idSP._id && item.idLoai === idLoai
    );
    
    return (
        <div className='w-full p-5 grid grid-cols-12 items-center border-b border-gray-200'>
            <div className='col-span-1 text-center'>
                <input 
                type='checkbox' className="w-5 h-5 cursor-pointer rounded accent-emerald-600"    
                checked={isChecked} 
                onChange={() => onSelectItem(sanPham)} />
            </div>
            <div className='col-span-5 flex items-center gap-3'>
                <img src={idSP.dsAnhSP} alt={idSP.tenSP} className='w-14 h-14 object-cover rounded' />
                <div>
                    <p className='line-clamp-2'>{idSP.tenSP}</p>
                    <p className='text-gray-500 text-sm'>Phân loại: {tenLoai}</p>
                </div>
            </div>
            <div className='col-span-2 text-center'>
            {khuyenMai === 0 ? (
                <p>{giaLoai.toLocaleString()}đ</p>
            ) : (
                <>
                    <p className="text-gray-500 line-through">{giaLoai.toLocaleString()}đ</p>
                    <p className="text-red-500">{giaSauKhuyenMai.toLocaleString()}đ</p>
                </>
            )}
            </div>
            <div className='col-span-2 flex justify-center'>
                <div className='flex border border-gray-300 w-fit overflow-hidden'>
                    <button
                        className={`w-7 py-1 text-xl bg-gray-200 ${soLuong <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={soLuong <= 1}
                        onClick={() => onUpdateQuantity(idSP._id, idLoai, soLuong - 1)}
                    >
                        -
                    </button>
                    <input
                        className="w-10 text-center text-emerald-600 text-lg outline-none border-x border-gray-300"
                        value={soLuong}
                        readOnly
                    />
                    <button
                        className='w-7 py-1 text-xl bg-gray-200 cursor-pointer'
                        onClick={() => onUpdateQuantity(idSP._id, idLoai, soLuong + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className='col-span-1 text-center text-emerald-600 font-semibold'>
                <p>{(soLuong * giaSauKhuyenMai).toLocaleString()}đ</p>
            </div>
            <div className='col-span-1 text-center text-red-500 cursor-pointer hover:underline'
                onClick={() => onRemoveItem(idSP._id, idLoai)}>
                Xóa
            </div>
        </div>
    );
}

CartItemProduct.propTypes = {
    sanPham: PropTypes.object.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
};

export default CartItemProduct;
