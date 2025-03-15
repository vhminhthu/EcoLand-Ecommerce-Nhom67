import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { useState } from "react";

export const Roles = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, role });
  };

  return (
    <div>
      <Navigation>
        <Header title="Report Management" />
        <div className="!pt-16 !p-4">
          <h2 className="text-xl font-semibold !mb-4">Thêm phân quyền mới</h2>
          <form onSubmit={handleSubmit} className="bg-white !p-6 rounded-lg max-w-md border-2 border-green-700 shadow-lg">
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
                <option value="admin">Admin</option>
                <option value="moderator">Người kiểm duyệt</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white !py-2 rounded-md shadow-lg hover:bg-green-800 transition"
            >
              Thêm
            </button>
          </form>
        </div>
      </Navigation>
    </div>
  );
};