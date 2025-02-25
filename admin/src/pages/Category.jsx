import { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { FaEdit, FaPlus } from "react-icons/fa";

export const Category = () => {
  const [categories] = useState([
    { id: 1, name: "Rau củ", image: "https://images.unsplash.com/photo-1663262432134-93bb1e7a60ed?w=600&auto=format&fit=crop&q=60" },
    { id: 2, name: "Trái cây", image: "https://images.unsplash.com/photo-1533321942807-08e4008b2025?w=600&auto=format&fit=crop&q=60" },
    { id: 3, name: "Hạt", image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=600&auto=format&fit=crop&q=60" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const displayedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setImagePreview(category.image);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setSelectedCategory({ name: "", image: "" });
    setImagePreview("");
    setIsAdding(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Navigation>
      <Header title="Quản lý danh mục nông sản" />
      <div className="!pt-16 !p-4 min-h-screen flex flex-col">
        <div className="!p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md flex-grow">
          <div className="!mb-4 flex justify-end">
            <button className="bg-[#075312] hover:opacity-80 text-white !px-6 !p-2 rounded flex items-center gap-2" onClick={handleAdd}>
              <FaPlus /> Thêm
            </button>
          </div>
          <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-[#E6EAE6] text-[#075312] font-semibold text-left border-b">
                <th className="!p-3">Ảnh</th>
                <th className="!p-3">Tên danh mục</th>
                <th className="!p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 border-b">
                  <td className="!p-3 text-center">
                    <img src={category.image} alt={category.name} className="!w-10 !h-10 object-cover rounded-lg" />
                  </td>
                  <td className="!p-3">{category.name}</td>
                  <td className="!p-3 flex justify-center items-center gap-2">
                    <button className="bg-[#2A7534] hover:opacity-80 text-white !p-2 rounded flex items-center" onClick={() => handleEdit(category)}>
                      <FaEdit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center !mt-4 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-gray-300 hover:bg-gray-400 text-black !px-3 !py-1 rounded disabled:opacity-50"
            >
              Trước
            </button>
            <span>Trang {currentPage} / {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-300 hover:bg-gray-400 text-black !px-3 !py-1 rounded disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
      
      {(isEditing || isAdding) && (
        <div className="fixed !inset-0 flex items-center justify-center ">
          <div className="bg-white !p-6 rounded-lg shadow-lg !w-[600px] flex gap-6">
            <div className="!w-1/2 flex flex-col items-center">
              <h3 className="text-sm font-medium !mb-2">Ảnh danh mục</h3>
              <div className="relative !w-40 !h-40 border rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={imagePreview || "https://via.placeholder.com/150"} 
                  alt="Category"
                  className="w-full h-full object-cover"
                />
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <p className="text-xs text-gray-500 !mt-2">Nhấp để thay đổi ảnh</p>
            </div>
            <div className="!w-1/2">
              <h2 className="text-lg font-semibold !mb-4">{isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h2>
              <input type="text" defaultValue={selectedCategory.name} placeholder="Tên danh mục" className="w-full border !p-2 rounded !mb-3" />
              <div className="flex justify-end gap-2 !mt-4">
                <button className="!px-4 !py-2 bg-gray-300 rounded-lg" onClick={() => { isEditing ? setIsEditing(false) : setIsAdding(false); }}>Hủy</button>
                <button className="bg-green-600 text-white !px-4 !py-2 rounded">{isEditing ? "Lưu" : "Thêm"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Navigation>
  );
};
