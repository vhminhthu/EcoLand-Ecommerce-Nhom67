import CustomerLayout from '../../layouts/customer/CustomerLayout'
import MainLayout from '../../layouts/customer/MainLayout'
import { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { orders } from '../../data/product';
import PurchaseItem from '../../components/customer/common/items/PurchaseItem';

function PurchasePage() {
    const [selected, setSelected] = useState('Tất cả');

    const handleClick = (status) => {
        setSelected(status);
    };

    return (
        <MainLayout>
            <CustomerLayout>
                <div className='w-full border border-emerald-700 rounded-xl shadow-xl'>
                    <div className='rounded-t-xl bg-emerald-600 text-white flex justify-between py-5 px-10 text-xl'>
                        {['Tất cả', 'Chờ xác nhận', 'Chờ giao hàng', 'Vận chuyển', 'Hoàn thành'].map(select => (
                            <button 
                                key={select} 
                                className={`cursor-pointer px-4 py-2 ${selected === select ? 'border-b-2 border-white' : ''} hover:border-b-2 hover:border-white`}
                                onClick={() => handleClick(select)}
                            >
                                {select}
                            </button>
                        ))}
                    </div>
                    <div className='p-5'>
                        <div className="flex items-center shadow text-white border bg-emerald-600/80 rounded-lg !px-4 !py-1 w-full h-12">
                            <input 
                                type="text" 
                                placeholder="Bạn có thể tìm kiếm theo tên shop, ID đơn hàng hoặc tên sản phẩm..." 
                                className="w-full placeholder-gray-100 !px-2 text-sm h-10 bg-transparent focus:outline-none"
                            />
                            <BiSearch />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 px-5 pb-5">
                    {orders.map((pu) => (
                        <PurchaseItem key={pu.id} {...pu} />
                    ))}
                    </div>
                </div>
            </CustomerLayout>
        </MainLayout>
    )
}

export default PurchasePage