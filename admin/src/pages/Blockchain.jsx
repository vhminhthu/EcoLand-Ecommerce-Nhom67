import { useState } from 'react';
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import axios from "axios";

export const Blockchain = () => {
  const [showInspector, setShowInspector] = useState(false);
  const [showCertifier, setShowCertifier] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [showProductList, setShowProductList] = useState(false);

  const [productList, setProductList] = useState([]);
  const [inspector, setInspector] = useState(null);
  const [certifier, setCertifier] = useState(null);
  const [store, setStore] = useState(null);

  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const [showImageStore, setShowImageStore] = useState(false);
  const [imageStore, setImageStore] = useState("");

  const [searchInspector, setSearchInspector] = useState("");
  const [searchCertifier, setSearchCertifier] = useState("");
  const [searchStore, setSearchStore] = useState("");

  const fetchProduct = async () => {
    try {
      const response = await axios.get("/api/blockchain/all/product");
      setProductList(response.data);
    } catch (err) {
      console.error("Lỗi API:", err);
    }
  };

  const handleShowInspector = () => {
    setShowInspector((prev) => !prev);
    setShowCertifier(false);
    setShowStore(false);
    setShowProductList(false);
  };
  
  const handleShowCertifier = () => {
    setShowCertifier((prev) => !prev);
    setShowInspector(false);
    setShowStore(false);
    setShowProductList(false);
  };
  
  const handleShowStore = () => {
    setShowStore((prev) => !prev);
    setShowInspector(false);
    setShowCertifier(false);
    setShowProductList(false);
  };
  
  const handleShowProduct = () => {
    setShowProductList((prev) => !prev);
    setShowInspector(false);
    setShowCertifier(false);
    setShowStore(false);
    if (!showProductList) fetchProduct();
  }; 

  const handleSearchInspector = async () => {
    if (!searchInspector.trim()) return;
    try {
      const response = await axios.get(`/api/blockchain/inspector?address=${searchInspector}`);
      setInspector(response.data);
    } catch (err) {
      console.error("Lỗi API:", err);
      setInspector([]);
    }
  };

  const handleSearchCertifier = async () => {
    if (!searchCertifier.trim()) return;
    try {
      const response = await axios.get(`/api/blockchain/certifier?address=${searchCertifier}`);
      setCertifier(response.data);
    } catch (err) {
      console.error("Lỗi API:", err);
      setCertifier([]);
    }
  };
  
  const handleSearchStore = async () => {
    if (!searchStore.trim()) return;
    try {
      const response = await axios.get(`/api/blockchain/store?id=${searchStore}`);
      setStore(response.data);
    } catch (err) {
      console.error("Lỗi API:", err);
      setStore([]);
    }
  };

  const handleKeyDownInspector = (e) => {
    if (e.key === "Enter") {
      handleSearchInspector();
    }
  };

  const handleKeyDownCertifier = (e) => {
    if (e.key === "Enter") {
      handleSearchCertifier();
    }
  };
  
  const handleKeyDownStore = (e) => {
    if (e.key === "Enter") {
      handleSearchStore();
    }
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
                onClick={handleShowInspector}
              >
                <div className="text-xl font-semibold">Quản lý Inspector</div>
                <div className="mt-2 text-gray-300">Quản lý tài khoản người Inspector</div>
              </button>

              <button
                className="bg-green-600 text-white p-6 rounded-lg shadow-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleShowCertifier}
              >
                <div className="text-xl font-semibold">Quản lý người Certifier</div>
                <div className="mt-2 text-gray-300">Quản lý tài khoản người Certifier</div>
              </button>

              <button
                className="bg-yellow-600 text-white p-6 rounded-lg shadow-xl hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleShowStore}
              >
                <div className="text-xl font-semibold">Quản lý cửa hàng</div>
                <div className="mt-2 text-gray-300">Quản lý các cửa hàng</div>
              </button>

              <button
                className="bg-purple-600 text-white p-6 rounded-lg shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleShowProduct}
              >
                <div className="text-xl font-semibold">Quản lý sản phẩm</div>
                <div className="mt-2 text-gray-300">Quản lý các sản phẩm trong hệ thống blockchain</div>
              </button>
            </div>

            {showInspector && ( 
              <div className='w-full !my-3 bg-white !p-6 rounded-xl shadow-xl'>
                  <div className="flex items-center gap-2 !mb-4">
                    <input
                      type="text"
                      placeholder="Nhập Address Inspector..."
                      value={searchInspector}
                      onChange={(e) => setSearchInspector(e.target.value)}
                      onKeyDown={handleKeyDownInspector}
                      className="w-full !p-2  border rounded-md"
                    />
                    <button 
                      onClick={handleSearchInspector} 
                      className="!px-4 !py-2 bg-emerald-900 text-white rounded-md"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                  <h1 className='!mb-5 text-2xl font-black uppercase text-emerald-900 text-center'>Kết quả tìm kiểm Inspector trong Blockchain</h1>
                  <div className='!mt-2'>
                    {inspector && (
                      <div className='!mt-2'>
                        <div className='!mt-2 w-full rounded-md bg-emerald-900 text-white grid grid-cols-17 items-center font-semibold text-xl'>
                            <div className='col-span-1 text-center border-r !p-4 uppercase'>#</div>
                            <div className='col-span-8 border-r !p-4 text-center uppercase'>id</div>
                            <div className='col-span-4 border-r !p-4 text-center uppercase'>Tên cửa hàng</div>
                            <div className='col-span-4 border-r !p-4 text-center uppercase'>Hoạt động</div>
                        </div>
                          <div className='w-full rounded-md border-b bg-white text-black grid grid-cols-17 items-center text-lg !py-3'>
                              <div className='col-span-1 text-center border-r !p-4'>1</div>
                              <div className='col-span-8 text-center border-r !p-4'>{inspector[0]}</div>
                              <div className='col-span-4 text-center border-r !p-4'>{inspector[1]}</div>
                              <div className={`col-span-4 text-center border-r !p-4 ${inspector[2] ? "text-green-600 font-bold" : "text-red-600 font-bold"}`}>{inspector[2] ? "HOẠT ĐỘNG" : "NGƯNG HOẠT ĐỘNG"}</div>
                          </div>
                      </div>
                    )}
                  </div>
              </div>
            )}

            {showCertifier && ( 
              <div className='w-full !my-3 bg-white !p-6 rounded-xl shadow-xl'>
                  <div className="flex items-center gap-2 !mb-4">
                    <input
                      type="text"
                      placeholder="Nhập Address Certifier..."
                      value={searchCertifier}
                      onChange={(e) => setSearchCertifier(e.target.value)}
                      onKeyDown={handleKeyDownCertifier}
                      className="w-full !p-2   border rounded-md"
                    />
                    <button 
                      onClick={handleSearchCertifier} 
                      className="!px-4 !py-2 bg-emerald-900 text-white rounded-md"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                  <h1 className='!mb-5 text-2xl font-black uppercase text-emerald-900 text-center'>Kết quả tìm kiếm Certifier trong Blockchain</h1>
                  <div className='!mt-2'>
                    {certifier && (
                      <div className='!mt-2'>
                        <div className='!mt-2 w-full rounded-md bg-emerald-900 text-white grid grid-cols-17 items-center font-semibold text-xl'>
                          <div className='col-span-1 text-center border-r !p-4 uppercase'>#</div>
                          <div className='col-span-8 border-r !p-4 text-center uppercase'>id</div>
                          <div className='col-span-4 border-r !p-4 text-center uppercase'>Tên Certifier</div>
                          <div className='col-span-4 border-r !p-4 text-center uppercase'>Hoạt động</div>
                        </div>
                          <div className='w-full rounded-md border-b bg-white text-black grid grid-cols-17 items-center text-lg !py-3'>
                            <div className='col-span-1 text-center border-r !p-4'>1</div>
                            <div className='col-span-8 text-center border-r !p-4'>{certifier[0]}</div>
                            <div className='col-span-4 text-center border-r !p-4'>{certifier[1]}</div>
                            <div className={`col-span-4 text-center border-r !p-4 ${certifier[2] ? "text-green-600 font-bold" : "text-red-600 font-bold"}`}>{certifier[1] ? "HOẠT ĐỘNG" : "NGƯNG HOẠT ĐỘNG"}</div>
                          </div>
                      </div>
                    )}
                  </div>
              </div>
            )}

            {showStore && ( 
              <div className='w-full !my-3 bg-white !p-6 rounded-xl shadow-xl'>
                  <div className="flex items-center gap-2 !mb-4">
                    <input
                      type="text"
                      placeholder="Nhập ID cửa hàng..."
                      value={searchStore}
                      onChange={(e) => setSearchStore(e.target.value)}
                      onKeyDown={handleKeyDownStore}
                      className="w-full !p-2 border rounded-md"
                    />
                    <button 
                      onClick={handleSearchStore} 
                      className="!px-4 !py-2 bg-emerald-900 text-white rounded-md"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                  <h1 className='!mb-5 text-2xl font-black uppercase text-emerald-900 text-center'>Kết quả tìm kiểm Cửa hàng trong Blockchain</h1>
                  {store && (
                    <div className='!mt-2'>
                      <div className='!mt-2 w-full rounded-md bg-emerald-900 text-white grid grid-cols-16 items-center font-semibold text-xl'>
                          <div className='col-span-1 text-center border-r !p-4 uppercase'>#</div>
                          <div className='col-span-3 border-r !p-4 text-center uppercase'>id</div>
                          <div className='col-span-4 border-r !p-4 text-center uppercase'>Tên cửa hàng</div>
                          <div className='col-span-4 border-r !p-4 text-center uppercase'>Ảnh chứng nhận</div>
                          <div className='col-span-4 border-r !p-4 text-center uppercase'>Vị trí cửa hàng</div>
                      </div>
                        <div className='w-full rounded-md border-b bg-white text-black grid grid-cols-16 items-center text-lg !py-3'>
                            <div className='col-span-1 text-center border-r !p-4'>1</div>
                            <div className='col-span-3 text-center border-r !p-4'>{store[0]}</div>
                            <div className='col-span-4 text-center border-r !p-4'>{store[1]}</div>
                            <div className='col-span-4 text-center border-r !p-4'>
                              <button 
                                onClick={() => {
                                  setShowImageStore(!showImageStore); 
                                  setImageStore(store[2]);
                                }} 
                                className="text-blue-500 cursor-pointer"
                              >
                                Xem ảnh
                              </button>
                            </div>
                            <div className='col-span-4 text-center border-r !p-4'>{store[3]}</div>
                        </div>
                    </div>
                  )}
              </div>
            )}

            {showProductList && (
              <div className='w-full !my-3 bg-white !p-6 rounded-xl shadow-xl'>
                <h1 className='!mb-5 text-2xl font-black uppercase text-emerald-900 text-center'>
                  Danh sách các Sản Phẩm trong Blockchain
                </h1>
                <div className='!mt-2'>
                  <div className='!mt-2 w-full rounded-md bg-emerald-900 text-white grid grid-cols-33 items-center font-semibold text-md'>
                      <div className='col-span-1 text-center border-r !py-4 uppercase'>#</div>
                      <div className='col-span-5 border-r !py-4 text-center uppercase'>id</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Tên sản phẩm</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Tên cửa hàng</div>

                      <div className='col-span-4 border-r !py-4 text-center uppercase'>Loại trồng</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Ngày gieo</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Ngày thu hoạch</div>
                      <div className='col-span-3 border-r !py-4 text-center uppercase'>Ngày đóng gói</div>
                      <div className='col-span-2 border-r !py-4 text-center uppercase'>Hạn sử dụng</div>

                      <div className='col-span-2 border-r !py-4 text-center uppercase'>Người xác nhận</div>
                      <div className='col-span-2 border-r !py-4 text-center uppercase'>Chứng nhận</div>
                      <div className='col-span-2 border-r !py-4 text-center uppercase'>Duyệt</div>


                  </div>
                  {productList.map((i, index) => (
                      <div key={index} className='w-full rounded-md border-b bg-white text-black grid grid-cols-33 items-center text-sm !py-3'>
                        <div className='col-span-1 text-center border-r !py-4'>{index+1}</div>
                        <div className='col-span-5 border-r !py-4 text-center'>{i[0]}</div>
                        <div className='col-span-3 border-r !py-4 text-center'>{i[1]}</div>
                        <div className='col-span-3 border-r !py-4 text-center'>{i[2]}</div>

                        <div className='col-span-4 border-r !py-4 text-center'>{i[3]}</div>
                        <div className='col-span-3 border-r !py-4 text-center'>{i[4]}</div>
                        <div className='col-span-3 border-r !py-4 text-center'>{i[5]}</div>
                        <div className='col-span-3 border-r !py-4 text-center'>{i[6]}</div>
                        <div className='col-span-2 border-r !py-4 text-center'>{i[7]}</div>

                        <div className='col-span-2 border-r !py-4 text-center'>{i[8]}</div>
                        <div className='col-span-2 border-r !py-4 text-center'>
                          <p>{i[10]}</p>
                          <button onClick={() => {
                              setShowImage(!showImage);
                              setImage(i[11]);
                            }} 
                          className="text-blue-500 cursor-pointer">Xem ảnh</button>
                        </div>
                        <div className={`col-span-2 border-r !py-4 text-center ${i[9] ? "text-green-600 font-bold" : "text-red-600 font-bold"}`}>
                          {i[9] ? "RỒI" : "CHƯA"}
                        </div>
                      </div>
                    ))}
                </div>
                {showImage && (
                  <div className='fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white !p-4 rounded-lg'>
                      <div className='flex justify-end'>
                        <button className='!mb-5 cursor-pointer hover:text-red-500' 
                          onClick={() => {
                            setShowImage(!showImage);
                            setImage(null);
                          }} >X
                        </button>
                      </div>
                      <img src={`https://gateway.pinata.cloud/ipfs/${image}`} alt="Hình ảnh" className="w-50 h-59 object-cover mx-auto mt-2" />
                    </div>
                  </div>
                )}
                {showImageStore && (
                  <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
                    <div className='bg-white !p-4 rounded-lg'>
                      <div className='flex justify-end'>
                        <button className='!mb-5 cursor-pointer hover:text-red-500' 
                          onClick={() => {
                            setShowImageStore(!showImageStore);
                            setImageStore(null);
                          }} >X
                        </button>
                      </div>
                      <img src={`https://gateway.pinata.cloud/ipfs/${imageStore}`} alt="Hình ảnh 2" className="w-50 h-59 object-cover mx-auto mt-2" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Navigation>
    </div>
  );
};
