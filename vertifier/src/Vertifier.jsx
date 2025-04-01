import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../abi.js";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const ABI = abi;

const Vertifier = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isConnected, setIsConnected] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [approvedSignatures, setApprovedSignatures] = useState({});

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const etherProvider = new ethers.BrowserProvider(window.ethereum);
        await etherProvider.send("eth_requestAccounts", []);
        const signer = await etherProvider.getSigner();
        const address = await signer.getAddress();

        localStorage.setItem("account", address);
        localStorage.setItem("isConnected", true);

        setProvider(etherProvider);
        setContract(new ethers.Contract(CONTRACT_ADDRESS, ABI, signer));
        setAccount(address);
        setIsConnected(true);
      } catch (err) {
        setError("Không thể kết nối MetaMask.");
        console.error(err);
      }
    } else {
      setError("Vui lòng cài đặt MetaMask.");
    }
  };

  const disconnectMetaMask = () => {
    setIsConnected(false);
    setAccount(null);
    setProvider(null);
    setContract(null);
    setError("");
    localStorage.removeItem("account");
    localStorage.removeItem("isConnected");
  };

  const fetchProducts = async () => {
    if (!contract || !account) {
      setError("Chưa kết nối hợp đồng hoặc tài khoản.");
      return;
    }
  
    try {
    
      const participant = await contract.participants(account);
      
      if (!participant.isActive) {  
        setError("Tài khoản của bạn chưa đăng ký, không thể tải danh sách sản phẩm.");
        setProducts([]); 
        return;
      }
  
      setError(""); 
      const nextProductId = await contract.nextProductId();
      let productList = [];
  
      for (let i = 1; i < Number(nextProductId); i++) {
        const product = await contract.products(i);
        const productData = {
          id: product.productId.toString(),
          name: product.productName,
          farmerName: product.farmerName,
          seedType: product.sowing.seedType,
          sowingDate: product.sowing.sowingDate,
          quantity: product.sowing.quantity.toString(),
          status: Number(product.status),
        };
  
        if ([2, 4, 6].includes(productData.status)) {
          const growingInfo = product.growing;
          productData.fertilizerType = growingInfo.fertilizerType;
          productData.fertilizationDate = growingInfo.fertilizationDate;
          productData.pesticideType = growingInfo.pesticideType;
          productData.pesticideApplicationDate = growingInfo.pesticideApplicationDate;
        }
  
        if ([4, 6].includes(productData.status)) {
          const harvestInfo = product.harvest;
          productData.harvestingDate = harvestInfo.harvestingDate;
          productData.harvestingQuantity = harvestInfo.harvestingQuantity.toString();
        }
  
        if (productData.status === 6) {
          const PackagingInfo = product.packaging;
          productData.packagingDate = PackagingInfo.packagingDate;
          productData.expirationDate = PackagingInfo.expirationDate;
        }
  
        if (
          (activeTab === "all" && [0, 2, 4, 6].includes(productData.status)) ||
          (activeTab === "sowing" && productData.status === 0) ||
          (activeTab === "growing" && productData.status === 2) ||
          (activeTab === "harvesting" && productData.status === 4) ||
          (activeTab === "qualityCheck" && productData.status === 6)
        ) {
          productList.push(productData);
        }
      }
  
      setProducts(productList);
    } catch (err) {
      setError("Lỗi khi lấy sản phẩm từ hợp đồng.");
      console.error(err);
    }
  };
  

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    const storedIsConnected = localStorage.getItem("isConnected");

    if (storedIsConnected === "true" && storedAccount) {
      setIsConnected(true);
      setAccount(storedAccount);
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      fetchProducts();
    }
  }, [isConnected, activeTab]); 
  
  const approveProduct = async (productId, status) => {
    if (!contract) return;
    try {
      let tx;
      switch (status) {
        case 0:
          tx = await contract.approveSowedProduct(productId);
          break;
        case 2:
          tx = await contract.approveGrowingProduct(productId);
          break;
        case 4:
          tx = await contract.approveHarvestedProduct(productId);
          break;
        case 6:
          tx = await contract.approvePackagedProduct(productId);
          break;
        default:
          return;
      }
      
      await tx.wait(); 
  
  
      await fetchProducts();
  
      // Lưu chữ ký xác nhận
      setApprovedSignatures((prev) => ({ ...prev, [productId]: account }));
  
    } catch (err) {
      console.error("Lỗi khi duyệt sản phẩm:", err);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4">
    <div className="flex space-x-4 mb-4">
      {!isConnected ? (
        <button className="px-4 py-2 bg-[#4190b3] text-white rounded-md" onClick={connectMetaMask}>
          Kết nối Metamask
        </button>
      ) : (
        <button className="px-4 py-2 bg-[#d42b3c] text-white rounded-md" onClick={disconnectMetaMask}>
          Ngắt kết nối
        </button>
      )}
    </div>

    <div className="flex space-x-4 border-b pb-2">
      {["all", "sowing", "growing", "harvesting", "qualityCheck"].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 ${activeTab === tab ? "bg-emerald-700 text-white" : "bg-gray-200"} rounded-md`}
          onClick={() => setActiveTab(tab)}
          disabled={!isConnected}
        >
          {tab === "all" ? "Tất cả" : 
           tab === "sowing" ? "Gieo trồng" : 
           tab === "growing" ? "Phát triển" : 
           tab === "harvesting" ? "Thu hoạch" : "Kiểm tra chất lượng"}
        </button>
      ))}
    </div>

    <div className="mt-4 space-y-4">
  {isConnected ? (
    products.length > 0 ? (
      products.map((product, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg text-emerald-700 font-semibold">{product.name}</h2>
          <p className="font-medium">Tên sản phẩm: {product.name}</p>
          <p className="text-gray-500">Tên nông dân: {product.farmerName}</p>
          <p className="text-gray-500">Loại giống: {product.seedType}</p>
          <p className="text-gray-500">Ngày gieo trồng: {product.sowingDate}</p>
          <p className="text-gray-500">Số lượng: {product.quantity}</p>

          {/* Hiển thị thông tin bón phân và thuốc trừ sâu khi trạng thái là 2 hoặc 4 */}
          {(product.status === 2 || product.status === 4|| product.status === 6) && (
            <div className="mt-2 p-2 bg-blue-100 rounded-lg">
              {product.fertilizerType ? (
                <>
                  <p className="font-medium">Bón phân: {product.fertilizerType}</p>
                  <p className="text-gray-500">Ngày bón phân: {product.fertilizationDate}</p>
                </>
              ) : (
                <p className="text-gray-500">Thông tin bón phân chưa có.</p>
              )}

              {product.pesticideType ? (
                <>
                  <p className="font-medium">Thuốc trừ sâu: {product.pesticideType}</p>
                  <p className="text-gray-500">Ngày phun thuốc: {product.pesticideApplicationDate}</p>
                </>
              ) : (
                <p className="text-gray-500">Thông tin thuốc trừ sâu chưa có.</p>
              )}
            </div>
          )}

          {/* Hiển thị thông tin thu hoạch khi trạng thái là 4 */}
          {( product.status === 4 || product.status === 6) && (
            <div className="mt-2 p-2 bg-green-100 rounded-lg">
              <p className="font-medium">Ngày thu hoạch: {product.harvestingDate}</p>
              <p className="text-gray-500">Số lượng thu hoạch: {product.harvestingQuantity}</p>
            </div>
          )}

          { product.status === 6 && (
            <div className="mt-2 p-2 bg-purple-100 rounded-lg">
              <p className="font-medium">Ngày đóng gói: {product.packagingDate}</p>
              <p className="text-gray-500">Hạn sử dụng: {product.expirationDate}</p>
            </div>
          )}

        {product.status === 0 && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
              onClick={() => approveProduct(product.id, 0)}
            >
              Duyệt Gieo trồng
            </button>
          )}
          {product.status === 2 && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
              onClick={() => approveProduct(product.id, 2)}
            >
              Duyệt Phát triển
            </button>
          )}
          {product.status === 4 && (
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-md mt-2"
              onClick={() => approveProduct(product.id, 4)}
            >
              Duyệt Thu hoạch
            </button>
          )}
          {product.status === 6 && (
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded-md mt-2"
              onClick={() => approveProduct(product.id, 6)}
            >
              Duyệt Đóng gói
            </button>
          )}
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
    )
  ) : (
    <p className="text-center text-red-500">Vui lòng kết nối Metamask để xem sản phẩm.</p>
  )}

</div>
  </div>
  );
};

export default Vertifier;
