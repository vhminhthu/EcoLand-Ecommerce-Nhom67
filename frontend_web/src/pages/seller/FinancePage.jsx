import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../layouts/seller/MainLayout'

function FinancePage() {
    const { user, loading } = useAuth();
    
    return (
        <MainLayout>
            <div className='bg-white rounded-xl shadow-xl p-10 w-auto h-fit'>
                <span className='flex gap-2 text-xl items-center'>Số dư: <p className='text-3xl'>{user.soDuTien}</p></span>
                <p className='text-2xl font-bold my-5'>Truy vấn giao dịch</p>
                <div>
                    <div className='bg-amber-50rounded-md shadow-md'>
                        <p className='text-lg font-semibold bg-amber-300 p-3'>20/3/2025</p>
                        <div className='p-3 flex text-lg'>
                            <p className='flex-1'>Thêm</p>
                            <span className='flex flex-col flex-9'>
                                <span className='flex justify-between'>
                                    <p>TIỀN RA</p>
                                    <p className='font-semibold'>+100.000 VNĐ</p>
                                </span>
                                <span className='flex justify-between'>
                                    <p>Thanh toán của đơn hàng </p>
                                    <p className='text-'>23:30</p>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default FinancePage