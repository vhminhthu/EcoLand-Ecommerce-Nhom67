import MainLayout from '../../layouts/customer/MainLayout'
import { MdOutlineStorefront } from "react-icons/md";

const sanPhamChiTiet = [
    { id: 1, tenSanPham: 'Sản Phẩm 1', donGia: '100,000', soLuong: 2, thanhTien: '200,000' },
    { id: 2, tenSanPham: 'Sản Phẩm 2', donGia: '150,000', soLuong: 1, thanhTien: '150,000' }
];

function CheckoutPage() {
    return (
        <MainLayout>
            <h1 className='text-xl mb-5'>Thanh toán</h1>

            <div className='w-full p-6 bg-slate-50 shadow-md mb-5 items-center border-t-4 border-emerald-600'>
                <p className='text-emerald-600 text-2xl mb-3'>Địa Chỉ Nhận Hàng</p>
                <div className='flex gap-5 text-xl'>
                    <p className='font-semibold'>Võ Huỳnh Minh Thư</p>
                    <p className='font-semibold'>0965825919</p>
                    <p>113/79B Trần Văn Đang P11 Q3, Phường 11, Quận 3, TP. Hồ Chí Minh</p>
                    <p className='text-emerald-600 cursor-pointer'>Thay Đổi</p>
                </div>
            </div>

            <div className='w-full bg-slate-50 shadow-md mb-5 items-center'>
                <div className='grid grid-cols-12 pt-6 px-6'>
                    <div className='col-span-6 text-xl'>Sản Phẩm</div>
                    <div className='col-span-2 text-center text-gray-600'>Đơn Giá</div>
                    <div className='col-span-2 text-center text-gray-600'>Số lượng</div>
                    <div className='col-span-2 text-center text-gray-600'>Thành tiền</div>
                </div>
                
                <div className='flex gap-3 items-center text-lg my-5 px-6'>
                    <MdOutlineStorefront/>
                    Tên cửa hàng
                </div>

                {sanPhamChiTiet.map((sanPham) => (
                    <div key={sanPham.id} className='grid grid-cols-12 items-center mb-3 px-6'>
                        <div className='col-span-6 flex items-center gap-3'>
                            <img className='w-14 h-14 object-cover rounded' />
                            <div>
                                <p className='line-clamp-2'>{sanPham.tenSanPham}</p>
                                <p className='text-gray-500 text-sm'>Phân loại: </p>
                            </div>
                        </div>
                        <div className='col-span-2 text-center text-gray-600'>{sanPham.donGia}</div>
                        <div className='col-span-2 text-center text-gray-600'>{sanPham.soLuong}</div>
                        <div className='col-span-2 text-center text-gray-600'>{sanPham.thanhTien}</div>
                    </div>
                ))}

                <div className='border-t border-gray-300 mt-5 bg-green-50 h-fit'>
                    <div className='grid grid-cols-5'>
                        <div className='col-span-2 border-r border-b border-gray-300 border-dashed mt-5 ml-5'>
                            <label>Lời nhắn:</label>
                            <input 
                            className="ml-3 !px-5 !py-3 bg-white text-white text-m w-100 p-1 rounded focus:outline-none " 
                            placeholder="Lưu ý cho Người bán ..." 
                            type="text"
                            />
                        </div>
                        <div className='col-span-3 border-b border-gray-300 border-dashed grid grid-cols-6 mt-5 mx-5'>
                            <div className='col-span-2'>Phương thức vận chuyển</div>
                            <div className='col-span-3'>
                                <p>Vận chuyển trong nước</p>
                            </div>
                            <div className='col-span-1 text-emerald-600'>
                                14.000đ
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full p-6 bg-slate-50 shadow-md mb-5 items-center font-semibold'>

            </div>
        </MainLayout>
    )
}

export default CheckoutPage