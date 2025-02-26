import { useState } from "react";
import CustomerLayout from "../../layouts/customer/CustomerLayout";
import MainLayout from "../../layouts/customer/MainLayout";
import { FaRegEdit } from "react-icons/fa";

export default function ProfilePage() {
  const [username, setUsername] = useState("AzuraWright");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [phone, setPhone] = useState("********50");
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [image, setImage] = useState("/default-avatar.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <MainLayout>
      <CustomerLayout>
        <div className="max-w-5xl mx-auto bg-white shadow-md p-6 rounded-lg">
          {/* Tiêu đề */}
          <div className=" p-6 border-b text-xl text-green-950">
            <h2 className="text-xl font-bold text-green-700">Hồ Sơ Của Tôi</h2>
            <p className="text-gray-600 text-sm">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </p>
          </div>

          <div className="flex mt-5 gap-6">
            {/* Thông tin cá nhân */}
            <div className="flex-1 p-4 rounded-lg ">
              {/* Tên đăng nhập */}
              <div className="mb-10  flex items-center">
                <label className=" mr-9">Tên đăng nhập:</label>
                {isEditingUsername ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  <span className="text-black font-medium">{username}</span>
                )}
                <button
                  onClick={() => setIsEditingUsername(!isEditingUsername)}
                  className="ml-2 text-gray-500 hover:text-black"
                >
                 
                </button>
              </div>

              {/* Số điện thoại */}
              <div className="mb-16 flex items-center">
                <label className=" mr-10">Số điện thoại:</label>
                {isEditingPhone ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  <span className="text-black font-medium">{phone}</span>
                )}
                <button
                  onClick={() => setIsEditingPhone(!isEditingPhone)}
                  className="ml-10 text-gray-500 hover:text-black"
                >
                  <FaRegEdit size={20}/>
                </button>
              </div>

              {/* Nút Lưu */}
              <div className="flex justify-center mt-4">
                <button className="bg-[#1B8057] w-32 text-white px-4 py-2 rounded-sm hover:bg-green-700">
                    Lưu
                </button>
                </div>
            </div>

            {/* Ảnh đại diện */}
           {/* Ảnh đại diện */}
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg max-w-sm w-full">
            <img
                src={image}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border"
            />
            <label className="mt-3 cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                Chọn Ảnh
                <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                />
            </label>
            <p className="text-xs text-gray-500 mt-2">Dung lượng file tối đa 1 MB</p>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </MainLayout>
  );
}
