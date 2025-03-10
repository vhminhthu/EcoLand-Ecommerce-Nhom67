import PropTypes from 'prop-types';

function PurchaseItem(props) {
    const { _id, idDanhGia, cuaHangId, trangThai, dsSanPham, tongTienThanhToan, onCapNhatTrangThai, moDanhGia } = props;

    return (
        <div key={_id} className='border border-emerald-600 shadow rounded-xl p-3'>
            <div className='flex justify-between border-b-1 border-emerald-600 pb-3'>
                <div className='flex gap-3 items-center'>
                    <h3 className='font-medium'>{cuaHangId?.tenCH}</h3>
                    <button className='px-3 py bg-gray-100 border border-emerald-600 text-emerald-600 rounded-sm'>Chat</button>
                    <button className='px-3 py bg-gray-100 border border-emerald-600 text-emerald-600 rounded-sm'>Xem Shop</button>
                </div>
                <span className='uppercase text-emerald-500'>{trangThai || "không bt"}</span>
            </div>
            <div className='border-b-1 border-emerald-600'>
            {dsSanPham.map((product, index) => (
                <div key={index} className='border-b border-gray-200 flex items-center p-3'>
                    <img src={product.idSP.dsAnhSP} alt={product.idSP.tenSP} className='w-14 h-14 object-cover rounded' />
                    <div className='w-full ml-3'>
                        <p className='font-medium'>{product.idSP.tenSP}</p>
                        <p className='text-gray-500'>Phân loại: {product.phanLoai.tenLoai}</p>
                        <p className='text-gray-500 text-sm'>x{product.soLuong}</p>
                    </div>
                    <div className='w-fit'>{((product.phanLoai.giaLoai)* (1 - product.phanLoai.khuyenMai / 100)).toLocaleString()}đ</div>
                </div>
            ))}
            </div>
            <p className='flex justify-end'>Tổng tiền: <span className='ml-2 text-2xl text-emerald-600 font-bold'>{tongTienThanhToan.toLocaleString()}đ</span></p>
            <span className='flex justify-end mt-3'>
                {/* <button 
                    disabled={orderReceived}
                    className='border border-emerald-600 text-emerald-600 font-medium px-5 py-2 rounded-xl'
                    >
                    {orderReceived ? 'Đã nhận hàng' : 'Nhận hàng'}
                </button> */}
                {trangThai === "Chờ giao hàng" && (
                    <button 
                        onClick={() => onCapNhatTrangThai(_id, "Hoàn thành")} 
                        className='border border-emerald-600 text-emerald-600 font-medium px-5 py-2 rounded-xl'>
                        Đã nhận được hàng
                    </button>
                )}
                {trangThai === "Hoàn thành" && (!idDanhGia || idDanhGia.length === 0) && (
                    <button 
                        onClick={() => moDanhGia(_id, dsSanPham)}
                        className='border border-emerald-600 text-emerald-600 font-medium px-5 py-2 rounded-xl'>
                        Đánh giá
                    </button>
                )}
                {idDanhGia && idDanhGia.length > 0 && (
                    <p>Đã đánh giá</p>
                )}

            </span>
        </div>
    );
}

PurchaseItem.propTypes = {
    _id: PropTypes.string.isRequired,
    cuaHangId: PropTypes.string.isRequired,
    idDanhGia: PropTypes.string.isRequired,
    trangThai: PropTypes.string.isRequired,
    dsSanPham: PropTypes.arrayOf(
        PropTypes.shape({
            idSP: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                tenSP: PropTypes.string.isRequired,
                dsAnhSP: PropTypes.string.isRequired,
            }).isRequired,
            phanLoai: PropTypes.shape({
                id: PropTypes.number.isRequired,
                giaLoai: PropTypes.string.isRequired,
                tenLoai: PropTypes.string.isRequired,
                khuyenMai: PropTypes.number.isRequired,
            }).isRequired,
            soLuong: PropTypes.number.isRequired,
        })
    ).isRequired,
    tongTienThanhToan: PropTypes.number.isRequired,
    onCapNhatTrangThai: PropTypes.func.isRequired,
    moDanhGia: PropTypes.func.isRequired,
};

export default PurchaseItem;
