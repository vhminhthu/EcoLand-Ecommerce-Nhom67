import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { FaEdit, FaPlus } from "react-icons/fa";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ tenDM: "", anhDM: "" });
  const [CategoryId, setCategoryId] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/danhmuc/lay");
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        alert("Lỗi khi lấy danh mục.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCategory({ ...selectedCategory, anhDM: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCategory = async () => {
    try {
      await axios.post("/api/danhmuc/them", selectedCategory);
      setIsAdding(false);
      fetchCategories();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    }
  };

  const editCategory = async () => {
    try {
      await axios.patch(`/api/danhmuc/sua/${CategoryId}`, selectedCategory);
      setIsEditing(false);
      fetchCategories();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSave = () => {
    if (isEditing) {
      editCategory();
    } else {
      addCategory();
    }
  };

  const itemsPerPage = 4;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const displayedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Navigation>
      <Header title="Quản lý danh mục nông sản" />
      <div className="!pt-16 !p-4 min-h-screen flex flex-col">
        <div className="!p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md flex-grow">
          <div className="!mb-4 flex justify-end">
            <button
              className="bg-[#075312] hover:opacity-80 text-white !px-6 !p-2 rounded flex items-center gap-2"
              onClick={() => setIsAdding(true)}
            >
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
                <tr key={category._id} className="hover:bg-gray-50 border-b">
                  <td className="!p-3 text-center">
                    <img
                      src={category.anhDM}
                      alt={category.tenDM}
                      className="!w-10 !h-10 object-cover rounded-lg"
                    />
                  </td>
                  <td className="!p-3">{category.tenDM}</td>
                  <td className="!p-3 flex justify-center items-center gap-2">
                    <button
                      className="bg-[#2A7534] hover:opacity-80 text-white !p-2 rounded flex items-center"
                      onClick={() => {
                        setSelectedCategory(category);
                        setImagePreview(category.anhDM);
                        setCategoryId(category._id);
                        setIsEditing(true);
                      }}
                    >
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
        <div className="fixed !inset-0 flex items-center justify-center">
          <div className="bg-white !p-6 rounded-lg shadow-lg !w-[600px] flex flex-col gap-6">
            <h2 className="text-lg font-semibold !mb-4">
              {isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            </h2>
            <input
              type="text"
              value={selectedCategory.tenDM}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, tenDM: e.target.value })}
              placeholder="Tên danh mục"
              className="w-full border !p-2 rounded !mb-3"
            />
            <input type="file" onChange={handleImageChange} className="!mb-3" />
            {imagePreview && <img src={imagePreview} alt="Xem trước" className="!w-24 !h-24 object-cover" />}
            <div className="flex justify-end gap-2">
              <button className="!px-4 !py-2 bg-gray-300 rounded-lg" onClick={() => { setIsEditing(false); setIsAdding(false); }}>Hủy</button>
              <button className="bg-green-600 text-white !px-4 !py-2 rounded" onClick={handleSave}>{isEditing ? "Lưu" : "Thêm"}</button>
            </div>
          </div>
        </div>
      )}
    </Navigation>
  );
};