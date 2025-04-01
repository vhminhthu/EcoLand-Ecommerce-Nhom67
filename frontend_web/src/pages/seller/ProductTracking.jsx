import { useEffect, useState } from "react";
import MainLayout from "../../layouts/seller/MainLayout";
import ConnectAccount from "./ConnectAccount";
import EcoLandSupplyChainABI from "../../EcoLandSupplyChainABI.js"
import { BrowserProvider, Contract } from "ethers";
import { FaQrcode } from 'react-icons/fa'; 
import QRCode from 'react-qr-code'; 

const steps = ["Nhập thông tin cơ bản", "Nhập loại giống & vật tư", "Nhập ngày thu hoạch", "Nhập ngày đóng gói", "Hoàn thành"];
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const ProductTracking = () => {
  const [userAddress, setUserAddress] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const [contract, setContract] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const openQRDialog = () => {
      setIsModalOpen(true);
  };

  const closeQRDialog = () => {
      setIsModalOpen(false);
  };


  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
        setUserAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    async function init() {
      try {
        if (!window.ethereum) {
          throw new Error("MetaMask chưa được cài đặt!");
        }
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new Contract(contractAddress, EcoLandSupplyChainABI, signer);
        setContract(contractInstance);
      } catch (err) {
        console.error("Lỗi khi khởi tạo: ", err);
      }
    }
    init();
  }, []);
  
  const fetchProducts = async () => {
    if (!contract || !userAddress) return;

    setError('');
    try {
      const nextProductId = await contract.nextProductId();  
      let productList = [];
      for (let i = 1; i < Number(nextProductId); i++) {
        const product = await contract.products(i);
        if (product.farmer === userAddress) {
          productList.push(product);
        }
      }
      setProducts(productList);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError('Error fetching products: ' + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [contract, userAddress]);  

  const handleSelectProduct = (product) => {
    setFormData(product);
    setSelectedProduct(product);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleCreateProduct = () => {
    const newProduct = {
      productName: "",
      farmerName: "",
      sowing: {
        seedType: "",
        sowingDate: "",
        quantity: 1,
      },
      growing: {
        fertilizerType: "",
        fertilizationDate: "",
        pesticideType: "",
        pesticideApplicationDate: "",
      },
      harvest: {
        harvestingDate: "",
        harvestingQuantity: 1,
      },
      packaging: {
        packagingDate: "",
        expirationDate: "",
      },
      status: 0,
    };
    setCurrentStep(0);
    setFormData(newProduct);
  };
  
  const SowingInfo = async () => {
    if (!contract || !contractAddress || !userAddress) {
      alert("Hợp đồng chưa được kết nối hoặc địa chỉ người dùng không hợp lệ.");
      return;
    }

    try {
      const gasLimit = await contract.createProduct.estimateGas( formData.productName, formData.farmerName, formData.sowing.seedType, formData.sowing.sowingDate, Number(formData.sowing.quantity)
      );
      const tx = await contract.createProduct( formData.productName, formData.farmerName, formData.sowing.seedType, formData.sowing.sowingDate, Number(formData.sowing.quantity),
        { gasLimit }
      );
      await tx.wait();
      alert("Giao dịch thành công! Sản phẩm đã được tạo.");  
      setFormData(null)    
      fetchProducts();
    } catch (err) {
      console.error("Lỗi giao dịch:", err);
      alert("Lỗi khi gửi giao dịch: " + err.message);
    }
  };

  const GrowingInfo = async () => {
    if (!contract || !contractAddress || !userAddress) {
      alert("Hợp đồng chưa được kết nối hoặc địa chỉ người dùng không hợp lệ.");
      return;
    }
    try {
      const gasLimit = await contract.advanceToGrowing.estimateGas(selectedProduct.productId, formData.growing.fertilizerType, formData.growing.fertilizationDate, formData.growing.pesticideType, formData.growing.pesticideApplicationDate);
      const tx = await contract.advanceToGrowing(selectedProduct.productId, formData.growing.fertilizerType, formData.growing.fertilizationDate, formData.growing.pesticideType, formData.growing.pesticideApplicationDate,
        { gasLimit }
      );
      await tx.wait();
      alert("Giao dịch thành công! Sản phẩm đã được cập nhật phát triển.");  
      setFormData(null)    
      fetchProducts();
    } catch (err) {
      console.error("Lỗi giao dịch:", err);
      alert("Lỗi khi gửi giao dịch: " + err.message);
    }
  };

  const HarvestInfo = async () => {
    if (!contract || !contractAddress || !userAddress) {
      alert("Hợp đồng chưa được kết nối hoặc địa chỉ người dùng không hợp lệ.");
      return;
    }

    try {
      const gasLimit = await contract.recordHarvest.estimateGas(selectedProduct.productId,  Number(formData.harvest.harvestingQuantity), formData.harvest.harvestingDate);
      const tx = await contract.recordHarvest(selectedProduct.productId,  Number(formData.harvest.harvestingQuantity), formData.harvest.harvestingDate,
        { gasLimit }
      );
      await tx.wait();
      alert("Giao dịch thành công! Sản phẩm đã được cập nhật thu hoạch.");  
      setFormData(null)    
      fetchProducts();
    } catch (err) {
      console.error("Lỗi giao dịch:", err);
      alert("Lỗi khi gửi giao dịch: " + err.message);
    }
  };

  const PackagingInfo = async () => {
    if (!contract || !contractAddress || !userAddress) {
      alert("Hợp đồng chưa được kết nối hoặc địa chỉ người dùng không hợp lệ.");
      return;
    }

    try {
      const gasLimit = await contract.packageProduct.estimateGas(selectedProduct.productId, formData.packaging.packagingDate, formData.packaging.packagingDate);
      const tx = await contract.packageProduct(selectedProduct.productId, formData.packaging.packagingDate, formData.packaging.packagingDate,
        { gasLimit }
      );
      await tx.wait();
      alert("Giao dịch thành công! Sản phẩm đã được cập nhật thu hoạch.");  
      setFormData(null)    
      fetchProducts();
    } catch (err) {
      console.error("Lỗi giao dịch:", err);
      alert("Lỗi khi gửi giao dịch: " + err.message);
    }
  };

  return (
    <MainLayout>
      <div className="p-3 flex flex-col min-h-screen">
        <ConnectAccount setUserAddress={setUserAddress} userAddress={userAddress}/>
        {userAddress ? (
          <>
          {!formData ? (
            <div className="min-w-[1000px]">
              <div className="flex justify-between mb-3 items-center">
                <h2 className="text-2xl font-bold mb-4">Danh sách nông sản</h2>
                <button onClick={handleCreateProduct} disabled={!userAddress} className={`px-4 py-2 rounded-lg text-white cursor-pointer ${userAddress ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}>Tạo sản phẩm</button>
              </div>
              <div className=" rounded-lg overflow-hidden">
                <div className="text-xl grid grid-cols-4 bg-green-700 text-white p-3">
                  <div className="text-center">Tên sản phẩm</div>
                  <div className="text-center">Tên nông dân</div>
                  <div className="text-center">Trạng thái</div>
                  <div className="text-center">UUID</div>
                </div>
                {products.map((product, index) => (
                <>
                  <div
                    key={index}
                    className="text-lg bg-white grid grid-cols-4 p-5 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div className="text-center font-semibold">{product.productName}</div>
                    <div className="text-center">{product.farmerName}</div>
                    <div className={`text-center 
                      ${product.status == 0 ? 'text-green-700' : 
                        product.status == 1 ? 'text-blue-700' : 
                        product.status == 2 ? 'text-orange-700' : 
                        product.status == 3 ? 'text-purple-700' : 
                        product.status == 4 ? 'text-yellow-500' : 
                        product.status == 5 ? 'text-yellow-900' : 
                        product.status == 6 ? 'text-gray-700' : 
                        product.status == 7 ? 'text-red-700' : 'text-black'}`}
                      >
                      {product.status == 0
                        ? "Gieo trồng"
                        : product.status == 1
                        ? "Kiểm tra sau gieo trồng"
                        : product.status == 2
                        ? "Phát triển"
                        : product.status == 3
                        ? "Kiểm tra trong quá trình phát triển"
                        : product.status == 4
                        ? "Thu hoạch"
                        : product.status == 5
                        ? "Kiểm tra sau thu hoạch"
                        : product.status == 6
                        ? "Đóng gói"
                        : product.status == 7
                        ? "Kiểm tra chất lượng cuối cùng"
                        : "Không xác định"}
                    </div>
                    <div className="mx-auto">
                      <FaQrcode
                          size={30}
                          className="cursor-pointer text-green-500 hover:text-green-600"
                          onClick={(event) => {
                            event.stopPropagation(); 
                            openQRDialog();
                          }}
                        />
                    </div>
                  </div>
                  {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-screen bg-black/40 flex items-center justify-center z-50" onClick={closeQRDialog}>
                        <div className="w-[830px] bg-white p-5 rounded-lg shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-sm text-gray-800 mb-4"><strong>UUID</strong> {product.uuid}</h2>
                        <QRCode
                            value={`https://frontend-tttn-t7hc.vercel.app/product/detail/${product.uuid}`}
                            size={256}
                            fgColor="#000000"
                            bgColor="#ffffff"
                            className="mx-auto"
                        />
                        <button
                            onClick={closeQRDialog}
                            className="mt-4 py-2 px-4 w-full bg-green-600 text-white rounded-xl hover:bg-green-500"
                        >
                            Đóng
                        </button>
                        </div>
                    </div>
                  )}
                </>
                ))}
              </div>
            </div>       
          ) : (
            <div>
              <div className="flex space-x-9 mb-5">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex-auto min-w-[230px] text-center py-4 px-6 rounded-lg text-white font-semibold ${
                      currentStep === index ? "bg-green-600" : "bg-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            
              <div>
                {currentStep === 0 && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-md min-w-5xl">
                      <h2 className="text-xl font-semibold mb-6">Nhập thông tin cơ bản</h2>
                      <div className="grid grid-cols-1 gap-4">
                        
                        {/* Tên cây trồng */}
                        <div>
                          <label className="block font-medium mb-1">Tên cây trồng</label>
                          <input
                            type="text"
                            disabled={selectedProduct?.productName}
                            placeholder="Nhập tên cây trồng"
                            className="w-full p-3 border rounded"
                            value={formData.productName}
                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block font-medium mb-1">Tên nông dân</label>
                          <input
                            type="text"
                            disabled={selectedProduct?.farmerName}
                            placeholder="Nhập tên nông dân"
                            className="w-full p-3 border rounded"
                            value={formData.farmerName}
                            onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                          />
                        </div>
                    
                        {/* Loại giống */}
                        <div>
                          <label className="block font-medium mb-1">Loại giống</label>
                          <input
                            type="text"
                            disabled={selectedProduct?.sowing?.seedType}
                            placeholder="Nhập loại giống"
                            className="w-full p-3 border rounded"
                            value={formData.sowing.seedType}
                            onChange={(e) => setFormData({
                              ...formData,
                              sowing: {
                                ...formData.sowing,
                                seedType: e.target.value,
                              }
                            })}
                          />
                        </div>
                    
                        {/* Ngày gieo trồng */}
                        {selectedProduct?.sowing?.sowingDate ? (
                          <div>
                            <label className="block font-medium mb-1">Ngày gieo trồng</label>
                            <input
                              type="text"
                              disabled={selectedProduct?.sowing?.sowingDate}
                              className="w-full p-3 border rounded"
                              value={formData.sowing.sowingDate}
                              onChange={(e) => setFormData({
                                ...formData,
                                sowing: {
                                  ...formData.sowing,
                                  sowingDate: e.target.value,
                                }
                              })}
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block font-medium mb-1">Ngày gieo trồng</label>
                            <input
                              type="date"
                              disabled={selectedProduct?.sowing?.sowingDate}
                              className="w-full p-3 border rounded"
                              value={
                                formData.sowing.sowingDate
                                  ? formData.sowing.sowingDate.split("/").reverse().join("-")
                                  : ""
                              }
                              onChange={(e) => {
                                const formattedDate = e.target.value.split("-").reverse().join("/");
                                setFormData({
                                  ...formData,
                                  sowing: {
                                    ...formData.sowing,
                                    sowingDate: formattedDate,
                                  }
                                });
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <label className="block font-medium mb-1">Số lượng gieo trồng</label>
                          <input
                            type="number"
                            disabled={selectedProduct?.sowing?.quantity}
                            placeholder="Nhập số lượng gieo trồng"
                            className="w-full p-3 border rounded"
                            min={1}
                            value={formData.sowing.quantity}
                            onChange={(e) => setFormData({
                              ...formData,
                              sowing: {
                                ...formData.sowing,
                                quantity: e.target.value,
                              }
                            })}
                          />
                        </div>
                        
                      </div>
                      {!selectedProduct && formData.status == 0 ? (
                        <button className="bg-blue-500 text-white py-3 px-5 rounded-md cursor-pointer w-full mt-5 text-xl hover:bg-blue-600" onClick={SowingInfo}>
                          Thêm sản phẩm
                        </button>
                      ) : null}
                    </div> 
                    <div className="flex justify-between mt-4">
                      {currentStep < steps.length - 1 && (Number(formData?.status) > 0) && (
                        <button onClick={handleNext} disabled={formData.status === 0} className={`bg-green-600 text-white py-2 px-4 rounded ml-auto ${formData.status === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                          Tiếp tục
                        </button>
                      )} 
                    </div>   
                  </>        
                )}
            
                {currentStep === 1 && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-md min-w-5xl">
                      <h2 className="text-xl font-bold mb-4">Nhập loại phân bón & vật tư</h2>
                      <div className="grid grid-cols-1 gap-4">
                    
                        {/* Loại phân bón */}
                        <div>
                          <label className="block font-medium mb-1">Loại phân bón</label>
                          <input
                            type="text"
                            disabled={selectedProduct?.growing?.fertilizerType}
                            placeholder="Nhập loại phân bón"
                            className="w-full p-3 border rounded"
                            value={formData?.growing?.fertilizerType}
                            onChange={(e) => setFormData({
                              ...formData,
                              growing: {
                                ...formData.growing,
                                fertilizerType: e.target.value,
                              }
                            })}                
                          />
                        </div>
                    
                        {/* Ngày bón phân */}
                        {selectedProduct?.growing?.fertilizationDate ? (
                          <div>
                            <label className="block font-medium mb-1">Ngày phân bón</label>
                            <input
                              type="text"
                              disabled={selectedProduct?.growing?.fertilizationDate}
                              className="w-full p-3 border rounded"
                              value={formData.growing.fertilizationDate}
                              onChange={(e) => setFormData({
                                ...formData,
                                growing: {
                                  ...formData.growing,
                                  fertilizationDate: e.target.value,
                                }
                              })}
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block font-medium mb-1">Ngày phân bón</label>
                            <input
                              type="date"
                              disabled={selectedProduct?.growing?.fertilizationDate}
                              className="w-full p-3 border rounded"
                              value={
                                formData.growing.fertilizationDate
                                  ? formData.growing.fertilizationDate.split("/").reverse().join("-") 
                                  : ""
                              }
                              onChange={(e) => {
                                const formattedDate = e.target.value.split("-").reverse().join("/");
                                setFormData({
                                  ...formData,
                                  growing: {
                                    ...formData.growing,
                                    fertilizationDate: formattedDate, 
                                  }
                                });
                              }}
                            />
                          </div>
                        )}
                    
                        {/* Thuốc bảo vệ thực vật */}
                        <div>
                          <label className="block font-medium mb-1">Thuốc bảo vệ thực vật</label>
                          <input
                            type="text"
                            disabled={selectedProduct?.growing?.pesticideType}
                            placeholder="Nhập tên thuốc bảo vệ thực vật"
                            className="w-full p-3 border rounded"
                            value={formData.growing.pesticideType}
                            onChange={(e) => setFormData({
                              ...formData,
                              growing: {
                                ...formData.growing,
                                pesticideType: e.target.value,
                              }
                            })} 
                          />
                        </div>
                    
                        {/* Ngày phun thuốc */}
                        {selectedProduct?.growing?.pesticideApplicationDate ? (
                          <div>
                            <label className="block font-medium mb-1">Ngày phun thuốc</label>
                            <input
                              type="text"
                              disabled={selectedProduct?.growing?.pesticideApplicationDate}
                              className="w-full p-3 border rounded"
                              value={formData.growing.pesticideApplicationDate}
                              onChange={(e) => setFormData({
                                ...formData,
                                growing: {
                                  ...formData.growing,
                                  pesticideApplicationDate: e.target.value,
                                }
                              })}
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block font-medium mb-1">Ngày phun thuốc</label>
                            <input
                              type="date"
                              disabled={selectedProduct?.growing?.pesticideApplicationDate}
                              className="w-full p-3 border rounded"
                              value={
                                formData.growing.pesticideApplicationDate
                                  ? formData.growing.pesticideApplicationDate.split("/").reverse().join("-") 
                                  : ""
                              }
                              onChange={(e) => {
                                const formattedDate = e.target.value.split("-").reverse().join("/"); 
                                setFormData({
                                  ...formData,
                                  growing: {
                                    ...formData.growing,
                                    pesticideApplicationDate: formattedDate, 
                                  }
                                });
                              }}
                            />
                          </div>
                        )}
                        {(selectedProduct && selectedProduct.status == 1) ? (
                          <button className="bg-blue-500 text-white py-3 px-5 rounded-md cursor-pointer w-full text-xl hover:bg-blue-600" onClick={GrowingInfo}>
                            Cập nhật giai đoạn phát triển
                          </button>
                        ) : null}
                    
                      </div>
                    </div>  
                    <div className="flex justify-between mt-4">
                      {currentStep > 0 && (
                        <button onClick={handlePrev} className="bg-gray-500 text-white py-2 px-4 rounded">
                          Quay lại
                        </button>
                      )}
                      {currentStep < steps.length - 1 && (Number(formData?.status) >= 3) && (
                        <button
                          onClick={handleNext}
                          disabled={Number(formData?.status) < 3}
                          className={`bg-green-600 text-white py-2 px-4 rounded ml-auto ${
                            Number(formData?.status) < 3 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          Tiếp tục
                        </button>
                      )} 
                    </div>  
                  </>   
                )}
            
                {currentStep === 2 && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-md min-w-5xl">
                      <h2 className="text-2xl font-semibold mb-10">Nhập thông tin thu hoạch</h2>
                      <div className="grid grid-cols-1 gap-4">
                    
                        {/* Ngày thu hoạch */}
                        {selectedProduct?.harvest?.harvestingDate ? (
                          <div>
                            <label className="block font-medium mb-1">Ngày thu hoạch</label>
                            <input
                              type="text"
                              disabled={selectedProduct?.harvest?.harvestingDate}
                              className="w-full p-3 border rounded"
                              value={formData.harvest.harvestingDate}
                              onChange={(e) => setFormData({
                                ...formData,
                                harvest: {
                                  ...formData.harvest,
                                  harvestingDate: e.target.value,
                                }
                              })}
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block font-medium mb-1">Ngày thu hoạch</label>
                            <input
                              type="date"
                              disabled={selectedProduct?.harvest?.harvestingDate}
                              className="w-full p-3 border rounded"
                              value={
                                formData.harvest.harvestingDate
                                  ? formData.harvest.harvestingDate.split("/").reverse().join("-") 
                                  : ""
                              }
                              onChange={(e) => {
                                const formattedDate = e.target.value.split("-").reverse().join("/"); 
                                setFormData({
                                  ...formData,
                                  harvest: {
                                    ...formData.harvest,
                                    harvestingDate: formattedDate, 
                                  }
                                });
                              }}
                            />
                          </div>
                        )}
                    
                        {/* Số lượng thu hoạch */}
                        <div>
                          <label className="block font-medium mb-4">Số lượng thu hoạch (kg)</label>
                          <input
                            type="number"
                            disabled={selectedProduct?.harvest?.harvestingQuantity}
                            placeholder="Nhập số lượng thu hoạch"
                            className="w-full p-3 border rounded"
                            min={1}
                            value={formData.harvest.harvestingQuantity}
                            onChange={(e) => setFormData({
                              ...formData,
                              harvest: {
                                ...formData.harvest,
                                harvestingQuantity: e.target.value,
                              }
                            })}
                          />
                        </div>
                        {(selectedProduct && selectedProduct.status == 3) ? (
                          <button className="bg-blue-500 text-white py-3 px-5 rounded-md cursor-pointer w-full text-xl hover:bg-blue-600" onClick={HarvestInfo}>
                            Cập nhật giai đoạn thu hoạch
                          </button>
                        ) : null}
                      </div>
                    </div>   
                    <div className="flex justify-between mt-4">
                      {currentStep > 0 && (
                        <button onClick={handlePrev} className="bg-gray-500 text-white py-2 px-4 rounded">
                          Quay lại
                        </button>
                      )}
                      {currentStep < steps.length - 1 && (Number(formData?.status) >= 5) && (
                        <button
                          onClick={handleNext}
                          disabled={Number(formData?.status) < 5}
                          className={`bg-green-600 text-white py-2 px-4 rounded ml-auto ${
                            (Number(formData?.status) < 5) ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          Tiếp tục
                        </button>
                      )} 
                    </div>  
                  </>         
                )}
  
                {currentStep === 3 && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-md min-w-5xl">
                      <h2 className="text-2xl font-semibold mb-10">Nhập thông tin đóng gói</h2>
                      <div className="grid grid-cols-1 gap-4">
                    
                        {/* Ngày đóng gói */}
                        {selectedProduct?.packaging?.packagingDate ? (
                          <div>
                            <label className="block font-medium mb-1">Ngày đóng gói</label>
                            <input
                              type="text"
                              disabled={selectedProduct?.packaging?.packagingDate}
                              className="w-full p-3 border rounded"
                              value={formData.packaging.packagingDate}
                              onChange={(e) => setFormData({
                                ...formData,
                                packaging: {
                                  ...formData.packaging,
                                  packagingDate: e.target.value,
                                }
                              })}
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block font-medium mb-1">Ngày đóng gói</label>
                            <input
                              type="date"
                              disabled={selectedProduct?.packaging?.packagingDate}
                              className="w-full p-3 border rounded"
                              value={
                                formData.packaging.packagingDate
                                  ? formData.packaging.packagingDate.split("/").reverse().join("-") 
                                  : ""
                              }
                              onChange={(e) => {
                                const formattedDate = e.target.value.split("-").reverse().join("/"); 
                                setFormData({
                                  ...formData,
                                  packaging: {
                                    ...formData.packaging,
                                    packagingDate: formattedDate, 
                                  }
                                });
                              }}
                            />
                          </div>
                        )}
                    
                        {/* Hạn sử dụng */}
                        {formData.packaging.expirationDate ? (
                          <div>
                            <label className="block font-medium mb-1">Ngày đóng gói</label>
                            <input
                              type="text"
                              disabled={selectedProduct?.packaging?.expirationDate}
                              className="w-full p-3 border rounded"
                              value={formData.packaging.expirationDate}
                              onChange={(e) => setFormData({
                                ...formData,
                                packaging: {
                                  ...formData.packaging,
                                  expirationDate: e.target.value,
                                }
                              })}
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block font-medium mb-1">Ngày đóng gói</label>
                            <input
                              type="date"
                              disabled={selectedProduct?.packaging?.expirationDate}
                              className="w-full p-3 border rounded"
                              value={
                                formData.packaging.expirationDate
                                  ? formData.packaging.expirationDate.split("/").reverse().join("-") 
                                  : ""
                              }
                              onChange={(e) => {
                                const formattedDate = e.target.value.split("-").reverse().join("/"); 
                                setFormData({
                                  ...formData,
                                  packaging: {
                                    ...formData.packaging,
                                    expirationDate: formattedDate, 
                                  }
                                });
                              }}
                            />
                          </div>
                        )}
                        {(selectedProduct && selectedProduct.status == 5) ? (
                          <button className="bg-blue-500 text-white py-3 px-5 rounded-md cursor-pointer w-full text-xl hover:bg-blue-600" onClick={PackagingInfo}>
                            Cập nhật giai đoạn đóng gói
                          </button>
                        ) : null}
                      </div>
                    </div> 
                    <div className="flex justify-between mt-4">
                      {currentStep > 0 && (
                        <button onClick={handlePrev} className="bg-gray-500 text-white py-2 px-4 rounded">
                          Quay lại
                        </button>
                      )}
                      {currentStep < steps.length - 1 && (Number(formData?.status) >= 7) && (
                        <button
                          onClick={handleNext}
                          disabled={Number(formData?.status) < 7}
                          className={`bg-green-600 text-white py-2 px-4 rounded ml-auto ${
                            Number(formData?.status) < 7 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          Tiếp tục
                        </button>
                      )} 
                    </div>  
                  </>           
                )}
            
                {currentStep === 4 && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-md min-w-5xl">
                      <h2 className="text-2xl font-semibold mb-5">Hoàn thành</h2>
                      <p className="mb-2"><strong className="text-emerald-800">Tên nông sản:</strong> {formData.productName}</p>
                      <p className="mb-2"><strong className="text-emerald-800">Tên nông dân:</strong> {formData.farmerName}</p>
                      <p className="mb-2"><strong className="text-emerald-800">Giống:</strong> {formData.sowing.seedType} <strong className="text-emerald-800 ml-3">Ngày gieo trồng:</strong> {formData.sowing.sowingDate} <strong className="text-emerald-800 ml-3">Số lượng gieo trồng:</strong> {formData.sowing.quantity}</p>
                      <p className="mb-2"><strong className="text-emerald-800">Phân bón:</strong> {formData.growing.fertilizerType} <strong className="text-emerald-800 ml-3">Ngày phân bón:</strong> {formData.growing.fertilizationDate}</p>
                      <p className="mb-2"><strong className="text-emerald-800">Thuốc:</strong> {formData.growing.pesticideType}<strong className="text-emerald-800 ml-3">Ngày dùng thuốc:</strong> {formData.growing.pesticideApplicationDate}</p>
                      <p className="mb-2"><strong className="text-emerald-800">Ngày thu hoạch:</strong> {formData.harvest.harvestingDate} <strong className="text-emerald-800 ml-3">Số lượng thu hoạch:</strong> {formData.harvest.harvestingQuantity}</p>
                      <p className="mb-2"><strong className="text-emerald-800">Ngày đóng gói:</strong> {formData.packaging.packagingDate}</p>
                      <p className="mb-2"><strong className="text-emerald-800">Hạn sử dụng:</strong> {formData.packaging.expirationDate}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                    {currentStep > 0 && (
                      <button onClick={handlePrev} className="bg-gray-500 text-white py-2 px-4 rounded">
                        Quay lại
                      </button>
                    )}
                    {currentStep === steps.length - 1 && (
                      <button onClick={() => {setFormData(null); setCurrentStep(0)} } className="bg-red-600 text-white py-2 px-4 rounded ml-auto">
                        Quay lại danh sách
                      </button>
                    )}
                    </div>  
                  </>
                )}      
              </div>
            </div>
          )}
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-100">
            <p className="text-2xl font-semibold text-red-500">VUI LÒNG KẾT NỐI METAMASK ĐỂ THẤY DANH SÁCH NÔNG SẢN</p>
          </div>
        )}

        
      </div>
    </MainLayout>
  );
};

export default ProductTracking;