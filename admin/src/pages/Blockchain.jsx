import { useState } from 'react';
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import axios from "axios";

export const Blockchain = () => {
  const [showAdminList, setShowAdminList] = useState(false);
  const [showInspectorList, setShowInspectorList] = useState(false);
  const [showStoreList, setShowStoreList] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [storeList, setStoreList] = useState([]);

  const [productList, setProductList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [inspectorList, setInspectorList] = useState([]);

  const fetchAdmin = async () => {
    try {
        const response = await axios.get("/api/blockchain/all/admin");
        setAdminList(response.data);
    } catch (err) {
        console.error("Lỗi API:", err);
    }
  };

  const fetchInspector = async () => {
    try {
        const response = await axios.get("/api/blockchain/all/inspector");
        setInspectorList(response.data);
    } catch (err) {
        console.error("Lỗi API:", err);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get("/api/blockchain/all/product");
      setProductList(response.data);
    } catch (err) {
      console.error("Lỗi API:", err);
    }
  };

  const fetchStore = async () => {
    try {
        const response = await axios.get("/api/blockchain/all/store");
        setStoreList(response.data);
    } catch (err) {
        console.error("Lỗi API:", err);
    }
  };

  const handleShowAdminList = () => {
    setShowAdminList((prev) => !prev);
    setShowInspectorList(false);
    setShowStoreList(false);
    setShowProductList(false);
    if (!showAdminList) fetchAdmin();
  };
  
  const handleShowInspectorList = () => {
    setShowInspectorList((prev) => !prev);
    setShowAdminList(false);
    setShowStoreList(false);
    setShowProductList(false);
    if (!showInspectorList) fetchInspector();
  };
  
  const handleShowStoreList = () => {
    setShowStoreList((prev) => !prev);
    setShowAdminList(false);
    setShowInspectorList(false);
    setShowProductList(false);
    if (!showStoreList) fetchStore();
  };
  
  const handleShowProductList = () => {
    setShowProductList((prev) => !prev);
    setShowAdminList(false);
    setShowInspectorList(false);
    setShowStoreList(false);
    if (!showProductList) fetchProduct();
  };  

  return (
    <div className="bg-gradient-to-r from-blue-200 via-indigo-100 to-pink-200 min-h-screen h-fit">
      <Navigation>
        <Header title="Blockchain Management" />
        <div>
          <div className="!mt-16 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-30">
              <button
                className="bg-blue-600 text-white p-6 rounded-lg shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleShowAdminList}
              >
                <div className="text-xl font-semibold">Quản lý người quản trị</div>
                <div className="mt-2 text-gray-300">Quản lý các quyền truy cập và tài khoản người quản trị</div>
              </button>

              <button
                className="bg-green-600 text-white p-6 rounded-lg shadow-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleShowInspectorList}
              >
                <div className="text-xl font-semibold">Quản lý người kiểm duyệt</div>
                <div className="mt-2 text-gray-300">Quản lý các người kiểm duyệt trong hệ thống</div>
              </button>

              <button
                className="bg-yellow-600 text-white p-6 rounded-lg shadow-xl hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleShowStoreList}
              >
                <div className="text-xl font-semibold">Quản lý cửa hàng</div>
                <div className="mt-2 text-gray-300">Quản lý các cửa hàng</div>
              </button>

              <button
                className="bg-purple-600 text-white p-6 rounded-lg shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleShowProductList}
              >
                <div className="text-xl font-semibold">Quản lý sản phẩm</div>
                <div className="mt-2 text-gray-300">Quản lý các sản phẩm trong hệ thống blockchain</div>
              </button>
            </div>

            {showAdminList && ( 
              <div className='w-full !my-3 bg-white !p-6 rounded-xl shadow-xl'>
                  <h1 className='!mb-5 text-2xl font-black uppercase text-emerald-900 text-center'>Danh sách các Admin trong Blockchain</h1>
                  <div className='!mt-2'>
                    <div className='!mt-2 w-full rounded-md bg-emerald-900 text-white grid grid-cols-5 items-center font-semibold text-xl'>
                        <div className='col-span-1 text-center border-r !py-4 uppercase'>#</div>
                        <div className='col-span-4 border-r !py-4 text-center uppercase'>Địa chỉ address</div>
                    </div>
                    {adminList.map((admin, index) => (
                        <div key={index} className='w-full rounded-md border-b bg-white text-black grid grid-cols-5 items-center text-lg !py-3'>
                            <div className='col-span-1 text-center border-r !p-4'>{index + 1}</div>
                            <div className='col-span-4 text-center border-r !p-4'>{admin}</div>
                        </div>
                    ))}
                  </div>
              </div>
            )}

            {showInspectorList && ( 
              <div className='w-full !my-3 bg-white !p-6 rounded-xl shadow-xl'>
                  <h1 className='!mb-5 text-2xl font-black uppercase text-emerald-900 text-center'>Danh sách các Người kiểm duyệt trong Blockchain</h1>
                  <div className='!mt-2'>
                    <div className='!mt-2 w-full rounded-md bg-emerald-900 text-white grid grid-cols-9 items-center font-semibold text-xl'>
                        <div className='col-span-1 text-center border-r !p-4 uppercase'>#</div>
                        <div className='col-span-2 border-r !p-4 text-center uppercase'>id</div>
                        <div className='col-span-2 border-r !p-4 text-center uppercase'>Tên tài khoản</div>
                        <div className='col-span-4 border-r !p-4 text-center uppercase'>Địa chỉ address</div>

                    </div>
                    {inspectorList.map((i, index) => (
                        <div key={index} className='w-full rounded-md border-b bg-white text-black grid grid-cols-9 items-center text-lg'>
                            <div className='col-span-1 text-center border-r !p-4'>{index + 1}</div>
                            <div className='col-span-2 text-center border-r !p-4'>{i[0]}</div>
                            <div className='col-span-2 text-center border-r !p-4'>{i[2]}</div>
                            <div className='col-span-4 text-center border-r !p-4'>{i[1]}</div>
                        </div>
                    ))}
                  </div>
              </div>
            )}

            {showStoreList && ( 
              <div className='w-full !my-3 bg-white !p-6 rounded-xl shadow-xl'>
                  <h1 className='!mb-5 text-2xl font-black uppercase text-emerald-900 text-center'>Danh sách các Cửa hàng trong Blockchain</h1>
                  <div className='!mt-2'>
                    <div className='!mt-2 w-full rounded-md bg-emerald-900 text-white grid grid-cols-8 items-center font-semibold text-xl'>
                        <div className='col-span-1 text-center border-r !p-4 uppercase'>#</div>
                        <div className='col-span-3 border-r !p-4 text-center uppercase'>id</div>
                        <div className='col-span-4 border-r !p-4 text-center uppercase'>Tên cửa hàng</div>

                    </div>
                    {storeList.map((i, index) => (
                        <div key={index} className='w-full rounded-md border-b bg-white text-black grid grid-cols-8 items-center text-lg !py-3'>
                            <div className='col-span-1 text-center border-r !p-4'>{index + 1}</div>
                            <div className='col-span-3 text-center border-r !p-4'>{i[0]}</div>
                            <div className='col-span-4 text-center border-r !p-4'>{i[1]}</div>
                        </div>
                    ))}
                  </div>
              </div>
            )}

            {showProductList && (
              <div className='w-full !my-3 bg-white !p-6 rounded-xl shadow-xl'>
                <h1 className='!mb-5 text-2xl font-black uppercase text-emerald-900 text-center'>
                  Danh sách các Sản Phẩm trong Blockchain
                </h1>
                <div className='!mt-2'>
                  <div className='!mt-2 w-full rounded-md bg-emerald-900 text-white grid grid-cols-25 items-center font-semibold text-lg'>
                      <div className='col-span-1 text-center border-r !py-4 uppercase'>#</div>
                      <div className='col-span-4 border-r !py-4 text-center uppercase'>id</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Tên sản phẩm</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Tên cửa hàng</div>

                      <div className='col-span-4 border-r !py-4 text-center uppercase'>Đã duyệt</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Đã kiểm tra</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Đang bán</div>


                      <div className='col-span-2 border-r !py-4 text-center uppercase'>Trạng thái</div>
                      <div className='col-span-2 border-r !py-4 text-center uppercase'>Kiểm duyệt</div>

                  </div>
                  {productList.map((i, index) => (
                      <div key={index} className='w-full rounded-md border-b bg-white text-black grid grid-cols-25 items-center text-sm !py-3'>
                          <div className='col-span-1 text-center border-r !py-4'>{index + 1}</div>
                          <div className='col-span-4 text-center border-r !py-4'>{i[0]}</div>
                          <div className='col-span-3 text-center border-r !py-4'>{i[1]}</div>
                          <div className='col-span-3 text-center border-r !py-4'>{i[2]}</div>

                          <div className='col-span-4 grid grid-rows-4 text-center border-r !py-4'>
                              <p className='row-span-1'><strong>Loại giống</strong></p>
                              <p className='row-span-1'>{i[3] != "" ? i[3] : "Chưa có"}</p>
                              <p className='col-span-1'><strong>Ngày gieo</strong></p>
                              <p className='col-span-1'>{i[4] != "" ? i[4] : "Chưa có"}</p>

                          </div>
                          <div className='col-span-3 grid grid-rows-4 text-center border-r !py-4'>
                              <p className='row-span-1'><strong>Vật dụng</strong></p>
                              <p className='row-span-1'>{i[6] != "" ? i[6] : "Chưa có"}</p>

                              <p className='row-span-1'><strong>Ngày thu hoạch</strong></p>
                              <p className='row-span-1'>{i[5] != "" ? i[5] : "Chưa có"}</p>

                          </div>
                          <div className='col-span-3 grid grid-rows-4 text-center border-r !py-4'>
                              <p className='row-span-1'><strong>Hạn sử dụng</strong></p>
                              <p className='row-span-1'>{i[7] != "" ? i[7] : "Chưa có"}</p>

                              <p className='row-span-1'><strong>Ngày đóng gói</strong></p>
                              <p className='row-span-1'>{i[8] != "" ? i[8] : "Chưa có"}</p>

                          </div>

                          <div className='col-span-2 text-center border-r !py-4'>{i[9]}</div>
                          <div className='col-span-2 text-center border-r !py-4'>{i[10]}</div>

                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Navigation>
    </div>
  );
};
