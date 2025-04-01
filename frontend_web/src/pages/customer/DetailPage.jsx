import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegCalendarAlt, FaUserCheck } from "react-icons/fa";
import { ethers } from "ethers";
import EcoLandSupplyChainABI from "../../EcoLandSupplyChainABI.js";

export const DetailPage = () => {
  const { uuid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const CONTRACT_ADDRESS =import.meta.env.VITE_CONTRACT_ADDRESS;
  const RPC_URL = import.meta.env.VITE_RPC_URL; 

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, EcoLandSupplyChainABI, provider);

        console.log("Contract Address:", CONTRACT_ADDRESS);
          console.log("EcoLandSupplyChainABI:", EcoLandSupplyChainABI);
          console.log("Provider:", provider);

          if (!CONTRACT_ADDRESS) {
            console.error("Lỗi: CONTRACT_ADDRESS chưa được định nghĩa");
            return;
          }


          console.log("Contract Instance:", contract);


        // Gọi hàm getProductDetails từ smart contract
        const productData = await contract.getProductDetails(uuid);
        console.log("Dữ liệu ne hihi:", productData);

        const formattedProduct = {
          productId: productData.productId ? productData.productId.toString() : "Không có ID",
          productName: productData.productName || "Không có tên sản phẩm",
          farmerName: productData.farmerName || "Không có tên nông dân",
          approvedBy: productData.approvedBy || "Chưa được phê duyệt",
          seedType: productData.seedType || "Chưa xác định",
          sowingDate: productData.sowingDate ? new Date(Number(productData.sowingDate) * 1000).toLocaleDateString() : "Chưa có ngày gieo trồng",
          harvestingDate: productData.harvestingDate ? new Date(Number(productData.harvestingDate) * 1000).toLocaleDateString() : "Chưa có ngày thu hoạch",
          packagingDate: productData.packagingDate ? new Date(Number(productData.packagingDate) * 1000).toLocaleDateString() : "Chưa có ngày đóng gói",
          expirationDate: productData.expirationDate ? new Date(Number(productData.expirationDate) * 1000).toLocaleDateString() : "Chưa có hạn sử dụng",
          status: Number(productData.status) || 0,  // Kiểm tra giá trị status
        };
        

        setProduct(formattedProduct);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu từ hợp đồng thông minh");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductInfo();
  }, [uuid]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Không có sản phẩm</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mt-12">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-green-800">{product.productName}</h1>
        <hr className="my-4 border-t-2 border-gray-300" />
      </div>

      <div className="space-y-6">
        <div className="text-gray-600 font-medium text-lg space-y-4">
          <p><strong className="font-semibold text-green-800">Mã sản phẩm:</strong> {product.productId}</p>
          <p><strong className="font-semibold text-green-800">Loại giống:</strong> {product.seedType}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 text-gray-600 font-medium text-lg">
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Ngày gieo trồng:</strong> {product.sowingDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Ngày thu hoạch:</strong> {product.harvestingDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Ngày đóng gói:</strong> {product.packagingDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Hạn sử dụng:</strong> {product.expirationDate}</span>
          </div>
        </div>

        <div className="text-gray-600 font-medium text-lg space-y-4">
          <div className="flex items-center space-x-2">
            <FaUserCheck className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Người kiểm định:</strong> {product.approvedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
