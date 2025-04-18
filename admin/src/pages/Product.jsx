import { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import Navigation from "../components/Navigation";
import Header from "../components/Header"; 
import QRCode from 'react-qr-code'; 


const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/sanpham/get/pending");
        setProducts(response.data.products || response.data);
      } catch (error) {
        setError("Lỗi khi lấy dữ liệu, vui lòng thử lại!");
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleRow = (id) => {
    setOpenId((prevOpenId) => (prevOpenId === id ? null : id));
  };

  const handleUpdateStatus = async (productId, trangThai, nguyenNhanTC = "Không") => {
    try {
        const response = await axios.patch(`/api/sanpham/update-status/${productId}`, {
            trangThai,
            nguyenNhanTC,
        });

        alert(response.data.message);

        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId ? { ...product, trangThai, nguyenNhanTC } : product
            )
        );

        setShowRejectDialog(false);
        setRejectReason("");
    } catch (error) {
        console.error("Lỗi cập nhật trạng thái:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };


 
  const handleRejectClick = (productId) => {
    setSelectedProductId(productId);
    setShowRejectDialog(true);
  };

  const openVideoModal = (videoUrl) => {
    setVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };


  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoUrl("");
  };

  return (
    <Navigation>
      <Header title="Quản lý sản phẩm" />
      <div className="!pt-7 !p-4">
        <div className="!max-w-6xl !mx-auto !mt-8">
          <div className="bg-[#075310] text-white !p-3 font-bold grid grid-cols-7 items-center">
            <span>Sản phẩm</span>
            <span>Người bán</span>
            <span>Nguồn gốc</span>
            <span>Trạng thái</span>
            <span></span>
          </div>

          {loading ? (
            <p className="text-center p-4">Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-red-500 text-center p-4">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center p-4">Không có sản phẩm nào đang chờ duyệt.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="border-b">
                <div 
                  className="grid grid-cols-7 items-center gap-4 !p-4 cursor-pointer bg-white" 
                  onClick={() => toggleRow(product._id)}
                >
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="!w-4 !h-4" />
                    <span className="text-[#003EB2] font-semibold">{product.tenSP}</span>
                  </div>
                  <span className="font-bold">{product.tenNguoiDung}</span>
                  <span>{product.nguonGoc}</span>
                  <span className="text-gray-500">{product.trangThai}</span>
                  <button onClick={(e) => e.stopPropagation()}>
                    {openId === product._id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                {openId === product._id && (
                  <div className="!p-4 bg-white shadow-md border-t max-h-[80vh] overflow-auto">
                    <div className="flex items-start gap-20">
                      <img src={product.dsAnhSP} alt={product.name} className="!w-32 !h-32 !ml-10 rounded-md border" />
                      <div>
                        <p><strong className="text-[#075310]">Loại sản phẩm:</strong> {product.tenDM}</p>
                        <p><strong className="text-[#075310]">Nhà cung cấp:</strong> {product.tenNguoiDung}</p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <CiShop size={20} /> {product.tenCuaHang}
                        </p>
                        <button
                          onClick={() => openVideoModal(product.video)}
                          className="text-blue-600"
                        >
                          Click to view video 
                        </button>
                      </div>
                      <QRCode
                    value={`https://frontend-tttn-t7hc.vercel.app/product/detail/${product.uuid}`}
                    size={80}
                    fgColor="#000000"
                    bgColor="#ffffff"
                    className="mx-auto"
                />
                    </div>
                    <div className="flex gap-4 !mt-3 justify-end">
                      <button 
                        className="!px-6 !py-2 bg-[#075310] text-white rounded-md"
                        onClick={() => handleRejectClick(product._id)}
                      >
                        TỪ CHỐI
                      </button>
                      <button 
                        className="!px-6 !py-2 bg-green-600 text-white rounded-md"
                        onClick={() => handleUpdateStatus(product._id, "Đang bán")}
                      >
                        DUYỆT
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedImage && (
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="relative bg-white p-4 rounded-lg shadow-lg w-[450px] h-[450px] flex justify-center items-center">
              <button
                className="absolute top-2 right-2 text-red-600 text-xl"
                onClick={() => setSelectedImage(null)}
              >
                ✖
              </button>
              <img
                src={selectedImage}
                alt="Giấy chứng nhận"
                className="w-[400px] h-[400px] object-contain"
              />
            </div>
          </div>
        )}



      {showRejectDialog && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white !p-6 rounded-md shadow-lg !w-96">
            <h2 className="text-lg font-bold mb-2">Nhập nguyên nhân từ chối</h2>
            <textarea
              className="w-full !p-2 border rounded-md"
              placeholder="Nhập lý do..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end !gap-3 !mt-4">
              <button
                className="bg-gray-400 !px-4 !py-2 rounded-md"
                onClick={() => setShowRejectDialog(false)}
              >
                Hủy
              </button>
              <button
                className="bg-red-600 text-white !px-4 !py-2 rounded-md"
                onClick={() => handleUpdateStatus(selectedProductId, "Từ chối", rejectReason)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

{isVideoModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <div>
              <video width="100%" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </Navigation>
  );
};

export default Product;
