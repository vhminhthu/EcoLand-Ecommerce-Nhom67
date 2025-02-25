import CartItem from '../../components/customer/common/items/CartItem'
import MainLayout from '../../layouts/customer/MainLayout'

function CartPage() {
    return (
        <MainLayout>
            <h1 className='text-xl'>Giỏ hàng</h1>
            <div className='w-full bg-amber-500 p-5 flex items-center'>
                <div className='bg-amber-50 w-1/12'>
                    <input type='checkbox' />
                </div>
                <div className='bg-amber-50 w-full'>
                    <p>Sản Phẩm</p>
                </div>
                <div className='bg-amber-50 w-2/12'>
                    <p>Đơn Gía</p>
                </div>
                <div className='bg-amber-50 w-2/12'>
                    <p>Số Lượng</p>
                </div>
                <div className='bg-amber-50 w-2/12'>
                    <p>Số Tiền</p>
                </div>
                <div className='bg-amber-50 w-2/12'>
                    <p>Thao Tác</p>
                </div>
            </div>
            <div>
                <CartItem/>
            </div>
        </MainLayout>
    )
}

export default CartPage