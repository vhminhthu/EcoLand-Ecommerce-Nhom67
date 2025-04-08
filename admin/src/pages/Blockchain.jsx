import { useEffect, useState } from 'react';
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { BrowserProvider, Contract } from "ethers";
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
import EcoLandSupplyChainABI from '../EcoLandSupplyChainABI';
import ConnectAccount from './ConnectAccount';
import Loading from '../components/Loading';

export const Blockchain = () => {
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const contractInstance = new Contract(contractAddress, EcoLandSupplyChainABI, provider);
        setContract(contractInstance);
      } catch (err) {
        console.error("Lỗi khi khởi tạo: ", err);
      }
    }
    init();
  }, []);

  const fetchProducts = async () => {
    if (!contract) return;
    try {
      const nextProductId = await contract.nextProductId();
      let productList = [];

      for (let i = 1; i < Number(nextProductId); i++) {
        const product = await contract.products(i);
        productList.push(product);
      }
      setProductList(productList);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [contract, userAddress]);

  if (loading) return <Loading />;

  return (
    <div className="bg-gradient-to-r from-blue-200 via-indigo-100 to-pink-200 min-h-screen h-fit">
      <Navigation>
        <Header title="Quản lý Blockchain" />
        <div className="!mt-16 flex flex-col justify-center">
          <div className="w-full !my-3 bg-white !p-6 rounded-xl shadow-xl">
            {userAddress ? (
              <>
                <h1 className="!mb-5 text-2xl font-black uppercase text-emerald-900 text-center">
                  Danh sách các Sản Phẩm trong Blockchain
                </h1>
                <div className="!mt-2">
                  <div className="w-full rounded-md bg-emerald-900 text-white grid grid-cols-31 items-center font-semibold text-md">
                    <div className="col-span-1 text-center border-r !py-2 uppercase">id</div>
                    <div className="col-span-3 border-r !py-2 text-center uppercase">Tên sản phẩm</div>
                    <div className="col-span-3 border-r !py-2 text-center uppercase">Tên nông dân</div>
                    <div className="col-span-2 border-r !py-2 text-center uppercase">Ngày gieo</div>
                    <div className="col-span-4 border-r !py-2 text-center uppercase">Ngày phân bón</div>
                    <div className="col-span-4 border-r !py-2 text-center uppercase">Ngày thuốc trừ sâu</div>
                    <div className="col-span-4 border-r !py-2 text-center uppercase">Ngày thu hoạch</div>
                    <div className="col-span-3 border-r !py-2 text-center uppercase">Ngày đóng gói</div>
                    <div className="col-span-3 border-r !py-2 text-center uppercase">Hạn sử dụng</div>
                    <div className="col-span-4 !py-2 text-center uppercase">Trạng thái</div>
                  </div>

                  {productList.map((sp, index) => (
                    <div key={Number(sp.productId) || index} className="w-full rounded-md border-b bg-white text-black grid grid-cols-31 items-center text-sm !py-3">
                      <div className="col-span-1 text-center border-r !py-2">{Number(sp.productId)}</div>
                      <div className="col-span-3 border-r !py-2 text-center">{sp?.productName || <span className="text-red-500">Chưa có Tên</span>}</div>
                      <div className="col-span-3 border-r !py-2 text-center">{sp?.farmerName || <span className="text-red-500">Chưa có Tên</span>}</div>
                      <div className="col-span-2 border-r !py-2 text-center">{sp?.sowing?.sowingDate || <span className="text-red-500">Chưa có Ngày</span>}</div>
                      <div className="col-span-4 border-r !py-2 text-center">{sp?.growing?.fertilizationDate || <span className="text-red-500">Chưa có Ngày</span>}</div>
                      <div className="col-span-4 border-r !py-2 text-center">{sp?.growing?.pesticideApplicationDate || <span className="text-red-500">Chưa có Ngày</span>}</div>
                      <div className="col-span-4 border-r !py-2 text-center">{sp?.harvest?.harvestingDate || <span className="text-red-500">Chưa có Ngày</span>}</div>
                      <div className="col-span-3 border-r !py-2 text-center">{sp?.packaging?.packagingDate || <span className="text-red-500">Chưa có Ngày</span>}</div>
                      <div className="col-span-3 border-r !py-2 text-center">{sp?.packaging?.expirationDate || <span className="text-red-500">Chưa có Hạn</span>}</div>
                      <div
                        className={`col-span-4 border-r !py-2 text-center ${
                          sp?.status == 0
                            ? "text-green-700"
                            : sp?.status == 1
                            ? "text-blue-700"
                            : sp?.status == 2
                            ? "text-orange-700"
                            : sp?.status == 3
                            ? "text-purple-700"
                            : sp?.status == 4
                            ? "text-yellow-500"
                            : sp?.status == 5
                            ? "text-yellow-900"
                            : sp?.status == 6
                            ? "text-gray-700"
                            : sp?.status == 7
                            ? "text-red-700"
                            : "text-black"
                        }`}
                      >
                        {sp?.status == 0
                          ? "Gieo trồng"
                          : sp?.status == 1
                          ? "Kiểm tra sau gieo trồng"
                          : sp?.status == 2
                          ? "Phát triển"
                          : sp?.status == 3
                          ? "Kiểm tra trong quá trình phát triển"
                          : sp?.status == 4
                          ? "Thu hoạch"
                          : sp?.status == 5
                          ? "Kiểm tra sau thu hoạch"
                          : sp?.status == 6
                          ? "Đóng gói"
                          : sp?.status == 7
                          ? "Kiểm tra chất lượng cuối cùng"
                          : "Không xác định"}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <ConnectAccount setUserAddress={setUserAddress} userAddress={userAddress} />
            )}
          </div>
        </div>
      </Navigation>
    </div>
  );
};
