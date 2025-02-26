import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import Navigation from "../components/Navigation";
import Header from "../components/Header";

// Dữ liệu sản phẩm
const products = [
  {
    id: 1,
    name: "Rau cải xanh",
    date: "29/8/2024",
    seller: "Elliot Wilson",
    from: "Đà Lạt",
    status: "Chờ duyệt",
    certification: "VIETGAP",
    certificationImage: "https://tamchau.com/wp-content/uploads/2022/12/Giay-chung-nhan-VietGAP.29-11-2022.28-11-2025a.jpg", // Ảnh chứng nhận
    type: "Rau",
    supplier: "Elliot Wilson",
    phone: "0978559616",
    company: "Lan Lan Tan",
    image: "https://i.pinimg.com/736x/c8/ab/0e/c8ab0ec65b8bdb11f5c38396b5d1f71d.jpg",
  },
  {
    id: 2,
    name: "Bắp mỹ",
    date: "15/1/2025",
    seller: "Elliot Wilson",
    from: "Đà Lạt",
    status: "Chờ duyệt",
    certification: "Organic",
    certificationImage: "https://tamchau.com/wp-content/uploads/2022/12/Giay-chung-nhan-VietGAP.29-11-2022.28-11-2025a.jpg",
    type: "Trái",
    supplier: "Elliot Wilson",
    phone: "0978559616",
    company: "Lan Lan Tan",
    image: "https://i.pinimg.com/736x/c8/ab/0e/c8ab0ec65b8bdb11f5c38396b5d1f71d.jpg",
  },
];

const Product = () => {
  const [openId, setOpenId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Toggle mở rộng sản phẩm
  const toggleRow = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Navigation>
      <Header title="Product Management" />
      <div className="!pt-16 !p-4">
        <div className="!max-w-4xl !mx-auto !mt-8">
          {/* Header */}
          <div className="bg-[#075310] text-white !p-3 font-bold grid grid-cols-6 items-center">
            <span>Product</span>
            <span>Date</span>
            <span>Seller</span>
            <span>From</span>
            <span>Status</span>
            <span></span>
          </div>

          {products.map((product) => (
            <div key={product.id} className="border-b">
              {/* Hàng chính */}
              <div
                className="grid grid-cols-6 items-center gap-4 !p-4 cursor-pointer bg-white"
                onClick={() => toggleRow(product.id)}
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="!w-4 !h-4" />
                  <span className="text-[#003EB2] font-semibold">{product.name}</span>
                </div>
                <span>{product.date}</span>
                <span className="font-bold">{product.seller}</span>
                <span>{product.from}</span>
                <span className="text-gray-500">{product.status}</span>
                <button>
                  {openId === product.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>

              {/* Nội dung mở rộng */}
              {openId === product.id && (
                <div className="!p-4 bg-white shadow-md border-t">
                  <div className="flex items-start gap-20">
                    {/* Hình ảnh sản phẩm */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="!w-32 !h-32 !ml-10 rounded-md border"
                    />
                    <div>
                      <p><strong className="text-[#075310]">Tên:</strong> {product.name}</p>
                      <p className="!mt-2"><strong className="text-[#075310]">Loại sản phẩm:</strong> {product.type}</p>
                      <p className="!mt-2">
                        <strong className="text-[#075310]">Chứng nhận:</strong>
                        <button
                          onClick={() => setSelectedImage(product.certificationImage)}
                          className="bg-gray-200 !px-2 !py-1 ml-2 rounded-md text-sm underline"
                        >
                          {product.certification}
                        </button>
                      </p>
                      <p className="!mt-2"> <strong className="text-[#075310]">Tên nhà cung cấp:</strong> {product.supplier}</p>
                      <p className="!mt-2"><strong className="text-[#075310]">SĐT:</strong> {product.phone}</p>
                      <p className="text-gray-500 flex items-center gap-2 !mt-2">
                        <CiShop size={20} />
                        {product.company}
                      </p>
                    </div>
                  </div>
                  {/* Nút duyệt & từ chối căn phải */}
                  <div className="flex gap-4 !mt-12 justify-end">
                    <button className="!px-6 !py-2 bg-[#075310] text-white rounded-md">TỪ CHỐI</button>
                    <button className="!px-6 !py-2 bg-green-600 text-white rounded-md">DUYỆT</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal hiển thị ảnh chứng nhận */}
      {selectedImage && (
        <div className="fixed !top-0 !left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white !p-4 rounded-lg relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute !top-2 !right-2 bg-red-500 text-white !px-1 !py-1 rounded-md"
            >
              ✕
            </button>
            <img src={selectedImage} alt="Chứng nhận" className="max-w-full max-h-[80vh]" />
          </div>
        </div>
      )}
    </Navigation>
  );
};

export default Product;
