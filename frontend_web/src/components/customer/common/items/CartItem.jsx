import PropTypes from 'prop-types';
import { MdOutlineStorefront } from "react-icons/md";
import CartItemProduct from './CartItemProduct';

function CartItem({ idCH, sanPhamChiTiet, onUpdateQuantity, onRemoveItem, onSelectItem, selectedItems }) {
    
    return (
        <div className='bg-slate-50 shadow-md mb-5'>
            <div className='w-full p-5 grid grid-cols-12 items-center border-b border-gray-200'>
                <div className='col-span-1 text-center'>
                    
                </div>
                <span className='col-span-5 flex text-lg font-bold items-center gap-2'>
                    <MdOutlineStorefront />
                    <p>{idCH.tenCH}</p>
                </span>
            </div>

            {sanPhamChiTiet.map((sanPham) => (
                <CartItemProduct
                    key={`${sanPham.idSP._id}-${sanPham.idLoai}`}
                    sanPham={sanPham}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                    onSelectItem={onSelectItem}
                    selectedItems={selectedItems}
                />
            ))}
        </div>
    );
}

CartItem.propTypes = {
    idCH: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        tenCH: PropTypes.string.isRequired,
    }).isRequired,
    sanPhamChiTiet: PropTypes.arrayOf(
        PropTypes.shape({
            idSP: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                tenSP: PropTypes.string.isRequired,
                phanLoai: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        tenLoai: PropTypes.string.isRequired,
                        giaLoai: PropTypes.number.isRequired,
                        khuyenMai: PropTypes.number.isRequired,
                    })
                ).isRequired,
                dsAnhSP: PropTypes.string.isRequired,
            }).isRequired,
            idLoai: PropTypes.number.isRequired,
            soLuong: PropTypes.number.isRequired,
        })
    ).isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
};

export default CartItem;
