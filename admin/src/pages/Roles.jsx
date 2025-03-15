import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { useState } from "react";
import axios from "axios";

export const Roles = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("AM1"); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/admin/create-admin", {
        tenAdmin: name,
        email,
        phanQuyen: role,
      });

      setMessage(res.data.message);
      setName("");
      setEmail("");
      setRole("AM1");
    } catch (error) {
      setMessage(error.response?.data?.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigation>
        <Header title="Quản lý phân quyền" />
        <div className="!pt-16 !p-4">
          <h2 className="text-xl font-semibold !mb-4">Thêm phân quyền mới</h2>
          {message && (
            <p className="mb-4 text-center text-sm font-semibold text-red-600">{message}</p>
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-white !p-6 rounded-lg max-w-md border-2 border-green-700 shadow-lg"
          >
            <div className="!mb-4">
              <label className="block text-sm font-medium text-gray-700">Tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="!mt-1 block w-full !p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="!mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!mt-1 block w-full !p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="!mb-4">
              <label className="block text-sm font-medium text-gray-700">Vai trò</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="!mt-1 block w-full !p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="SUPER_AM">Super Admin</option>
                <option value="AM1">AM1</option>
                <option value="AM2">AM2</option>
                <option value="CERTIFY">Certify</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white !py-2 rounded-md shadow-lg hover:bg-green-800 transition"
            >
              {loading ? "Đang xử lý..." : "Thêm"}
            </button>
          </form>
        </div>
      </Navigation>
    </div>
  );
};
