import MainLayout from "../../layouts/seller/MainLayout"
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

function HomePage() {
    const [isOpenCategory, setIsOpenCategory] = useState(false); 
    
    return (
        <MainLayout>
            <div className="h-full min-w-7xl grid grid-cols-9 grid-rows-5 gap-4">
                <div className="col-start-1 col-end-7 bg-white !p-5 rounded-xl shadow-xl row-start-1 row-end-4">
                    <span className="flex justify-between">
                        <p className="font-bold text-xl text-emerald-700">Tổng doanh thu</p>
                        <div className="relative">
                            <button className="w-30 cursor-pointer flex items-center justify-center gap-3 bg-gray-100 !px-5 !py-2 rounded-xl" 
                                onMouseEnter={() => setIsOpenCategory(true)}
                                onMouseLeave={() => setIsOpenCategory(false)}
                            >
                                <span>Ngày</span>
                                <IoIosArrowDown className="text-2xl" />
                            </button>
                            {isOpenCategory && (
                                <div className="w-30 absolute left-0 !mt-2 bg-white shadow-lg rounded-lg !p-2 z-50">
                                    <ul>
                                        <li className="hover:bg-gray-100 !p-2 cursor-pointer">
                                            Tuần
                                        </li>
                                        <li className="hover:bg-gray-100 !p-2 cursor-pointer">
                                            Tháng
                                        </li>
                                        <li className="hover:bg-gray-100 !p-2 cursor-pointer">
                                            Năm
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </span>
                    <p className="font-black !mt-1 text-3xl">100.000.000 đ</p>
                </div>

                <div className="col-start-7 col-end-10 bg-white !p-5 rounded-xl shadow-xl row-start-1 row-end-3">
                    <p className="font-bold text-xl text-emerald-700">Sản phẩm bán chạy</p>
                </div>

                <div className="col-start-1 col-end-7 bg-white !p-5 rounded-xl shadow-xl row-start-4 row-end-6">
                    <p className="font-bold text-xl text-emerald-700">Đơn hàng mới</p>
                </div>

                <div className="col-start-7 col-end-10 bg-white !p-5 rounded-xl shadow-xl row-start-3 row-end-6">
                    <p className="font-bold text-xl text-emerald-700">Tình trạng đơn hàng</p>
                </div>
            </div>
        </MainLayout>
    )
}

export default HomePage