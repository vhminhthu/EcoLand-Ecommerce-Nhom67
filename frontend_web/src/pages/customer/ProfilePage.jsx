import { useEffect, useState } from "react";
import CustomerLayout from "../../layouts/customer/CustomerLayout";
import MainLayout from "../../layouts/customer/MainLayout";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setSelectedImage(file);
};

const handleUpload = async () => {
  if (!selectedImage) {
    alert("Vui lòng chọn một ảnh!");
    return;
  }

  
  const reader = new FileReader();
  reader.readAsDataURL(selectedImage);
  reader.onloadend = async () => {
    try {
      const response = await axios.patch(
        "/api/nguoidung/update",
        { anhND: reader.result }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (response.data.nguoidung) {
        alert("Cập nhật ảnh thành công!");
        setUser({ ...user, anhND: response.data.nguoidung.anhND });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật ảnh:", error);
      alert("Không thể cập nhật ảnh, vui lòng thử lại!");
    }
  };
};




  // Lấy _id từ localStorage
  console.log("Dữ liệu trong localStorage:", localStorage.getItem("chat-user"));

  const storedUser = localStorage.getItem("chat-user");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  const userId = userData ? userData._id : null;
  console.log("User ID lấy từ localStorage:", userId);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/nguoidung/lay/${userId}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        console.log("Dữ liệu nhận được từ API:", response.data);
        setUser(response.data.nguoidung);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (!user) {
    return <div className="text-center py-10 text-red-500">Không tìm thấy người dùng!</div>;
  }

  return (
    <MainLayout>
      <CustomerLayout>
        <div className="max-w-5xl mx-auto bg-white shadow-md p-6 rounded-lg">
          <div className="p-6 border-b text-xl text-green-950">
            <h2 className="text-xl font-bold text-green-700">Hồ Sơ Của Tôi</h2>
            <p className="text-gray-600 text-sm">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </p>
          </div>

          <div className="flex mt-5 gap-6">
      
            <div className="flex-1 p-4 rounded-lg">
              <div className="mb-6 flex items-center">
                <label className="mr-6">Tên đăng nhập:</label>
                <span className="text-black font-medium">{user.tenNguoiDung}</span>
              </div>
              <div className="mb-6 flex items-center">
                <label className="mr-6">Email:</label>
                <span className="text-black font-medium">{user.email}</span>
              </div>
              <div className="mb-6">
                <label className="font-medium">Đang theo dõi:</label>
                <p className="text-gray-700">{user.dsTheoDoi.length} người</p>
              </div>
              <div className="mb-6">
                <label className="font-medium">Người theo dõi:</label>
                <p className="text-gray-700">{user.dsNguoiTheoDoi.length} người</p>
              </div>
            </div>

          
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg max-w-sm w-full">
              <img
                src={user.anhND || "/default-avatar.png"}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border"
              />
              <p className="text-xs text-gray-500 mt-2">Ảnh đại diện</p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-3"
              />
              <button
                onClick={handleUpload}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
              >
                Cập nhật ảnh
              </button>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </MainLayout>
  );
}
