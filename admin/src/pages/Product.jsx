import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Navigation from "../components/Navigation";
import Header from "../components/Header";

const products = [
  {
    id: 1,
    name: "Rau cải xanh",
    date: "29/8/2024",
    seller: "Elliot Wilson",
    from: "Đà Lạt",
    status: "Chờ duyệt",
    certification: "VIETGAP",
    type: "Rau",
    supplier: "Elliot Wilson",
    phone: "0978559616",
    company: "Lan Lan Tan",
    image: "https://i.pinimg.com/736x/4e/1b/f5/4e1bf52661ac1e353ff0397d083cf71f.jpg",
  },
  {
    id: 2,
    name: "Bắp mỹ",
    date: "1/15/2025",
    seller: "Elliot Wilson",
    from: "Đà Lạt",
    status: "Chờ duyệt",
    certification: "Organic",
    type: "Trái",
    supplier: "Elliot Wilson",
    phone: "0978559616",
    company: "Lan Lan Tan",
    image: "https://i.pinimg.com/736x/4e/1b/f5/4e1bf52661ac1e353ff0397d083cf71f.jpg",
  },
  {
    id: 3,
    name: "Bắp mỹ",
    date: "1/15/2025",
    seller: "Elliot Wilson",
    from: "Đà Lạt",
    status: "Chờ duyệt",
    certification: "Organic",
    type: "Trái",
    supplier: "Elliot Wilson",
    phone: "0978559616",
    company: "Lan Lan Tan",
    image: "https://i.pinimg.com/736x/4e/1b/f5/4e1bf52661ac1e353ff0397d083cf71f.jpg",
  },
];

const Product = () => {
  const [openId, setOpenId] = useState(null);

  const toggleRow = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Navigation>
      <Header title="Product Management" />
      <div className="!pt-16 !p-4">
        <div className="!max-w-4xl !mx-auto !mt-8">
          {/* Tiêu đề */}
          <div className="bg-green-700 text-white !p-3 font-bold grid grid-cols-6 items-center">
            <span>Product</span>
            <span>Date</span>
            <span>Seller</span>
            <span>From</span>
            <span>Status</span>
            <span></span>
          </div>

          {products.map((product) => (
            <div key={product.id} className="border-b ">
              {/* Main Row */}
              <div
                className="grid grid-cols-6 items-center gap-4 !p-4 cursor-pointer bg-white"
                onClick={() => toggleRow(product.id)}
              >
                <div className="flex items-center gap-2 ">
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

              {/* Expanded Detail */}
              {openId === product.id && (
                <div className="!p-4 bg-white shadow-md">
                  <hr className="!p-2"/>
                  <div className="flex !gap-10">
                    <img src={product.image} alt={product.name} className="!w-24 !h-24 rounded-md" />
                    <div>
                      <p><strong className="text-[#075310]">Tên:</strong> {product.name}</p>
                      <p><strong className="text-[#075310]">Loại sản phẩm:</strong> {product.type}</p>
                      <p><strong className="text-[#075310]">Chứng nhận:</strong> <span className="bg-gray-200 !px-2 !py-1 rounded-md">{product.certification}</span></p>
                      <p><strong className="text-[#075310]">Tên nhà cung cấp:</strong> {product.supplier}</p>
                      <p><strong className="text-[#075310]">SĐT:</strong> {product.phone}</p>
                      <p className="text-gray-500">{product.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 !mt-4">
                    <button className="!px-4 !py-2 bg-red-600 text-white rounded-md">TỪ CHỐI</button>
                    <button className="!px-4 !py-2 bg-green-600 text-white rounded-md">DUYỆT</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Navigation>
  );
};

export default Product;