import MainLayout from "../../layouts/customer/MainLayout";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import ProductCard from "../../components/customer/common/cards/ProductCard";
import { products2 } from "../../data/home";

const allCategories = [
  "Rau củ", "Trái cây", "Thực phẩm tươi sống", "Thủy sản", "Gạo",
  "Bắp", "Nước", "Thịt", "Cá", "Mì", "Đồ khô", "Gia vị"
];

const locations = ["TP.Hồ Chí Minh", "Hà Nội", "Quận 1", "Quận 3"];
const ratings = [5, 4, 3, 2, 1];

function CategoryPage() {
  const [expanded, setExpanded] = useState(false);
  const [sanPhamGIndex, setSanPhamGIndex] = useState(0);
  const soSanPhamGMoiSlide = 15;

  const xemThemSanPhamG = () => {
    if (sanPhamGIndex + soSanPhamGMoiSlide < products2.length) {
      setSanPhamGIndex((prevIndex) => prevIndex + soSanPhamGMoiSlide);
    }
  };

  const sanPhamGHienTai = products2.slice(0, sanPhamGIndex + soSanPhamGMoiSlide);
  const categoriesToShow = expanded ? allCategories : allCategories.slice(0, 5);

  return (
    <MainLayout>
      <div className="flex gap-6 p-4">
        {/* Sidebar */}
        <div className={`w-64 p-4 rounded-lg shadow-lg bg-[#FCFCFC] transition-all duration-300 ${expanded ? "h-auto" : "h-[800px]"}`}>
          <div className="flex items-center gap-2 text-[#1B8057] font-semibold mb-7">
            <FaBars />
            <span>Tất cả danh mục</span>
          </div>
          <hr className="mb-4 text-[#959595] font-bold" />
          <ul className="space-y-2">
            {categoriesToShow.map((category, index) => (
              <li key={index} className="text-[#4d4c4c] font-semibold cursor-pointer hover:text-green-600">
                {category}
              </li>
            ))}
            <li
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Ẩn bớt" : "Thêm..."}
            </li>
          </ul>
          <hr className="my-4 text-[#959595] font-bold" />
          <div className="mb-10">
            <h3 className="font-semibold mb-5">Nơi bán</h3>
            {locations.map((location, index) => (
              <div key={index} className="flex items-center gap-5 mb-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#1B8057]" />
                <span className="text-[#6F6F6F] font-semibold">{location}</span>
              </div>
            ))}
          </div>
          <hr className="my-4 text-[#959595] font-bold" />
          <div>
            <h3 className="font-semibold mb-2">Đánh giá</h3>
            {ratings.map((stars) => (
              <div key={stars} className="flex">
                {Array.from({ length: stars }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Sắp xếp theo</span>
            <div className="flex gap-2">
              <button className="px-6 py-2 border rounded-lg bg-[#1B8057] text-white">Phổ Biến</button>
              <button className="px-4 py-2 border font-semibold text-[#696969] rounded-lg">Mới nhất</button>
              <button className="px-4 py-2 border font-semibold text-[#696969] rounded-lg">Bán chạy</button>
              <select className="px-7 py-2 border font-semibold text-[#696969] rounded-lg">
                <option>Giá</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 justify-center">
            {sanPhamGHienTai.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          {sanPhamGIndex + soSanPhamGMoiSlide < products2.length && (
            <button
              className="cursor-pointer text-xl bg-emerald-600/50 text-white !py-2 !px-5 rounded-xl mx-auto block mt-5"
              onClick={xemThemSanPhamG}
            >
              Xem thêm
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default CategoryPage;
