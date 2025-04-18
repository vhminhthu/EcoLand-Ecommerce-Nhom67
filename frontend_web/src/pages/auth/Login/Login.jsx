import { FcGoogle } from "react-icons/fc";
import { MdMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [thongBao, setThongBao] = useState("");

  const queryClient = useQueryClient();

  const handleDangNhap = async (e) => {
    e.preventDefault();

    if (!email || !matKhau) {
      setThongBao("Vui lòng nhập email và mật khẩu!");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        matKhau,
      });

      setThongBao("Đăng nhập thành công!");
      console.log(response.data);
      localStorage.setItem("chat-user", JSON.stringify(response.data));
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    } catch (error) {
      if (error.response) {
        setThongBao(error.response.data.message || "Lỗi đăng nhập. Vui lòng thử lại!");
      } else {
        setThongBao("Lỗi không xác định. Vui lòng thử lại sau!");
      }
    }
  };


  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <img
        src="../../../../src/pages/auth/Login/rock.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="bg-white/30 backdrop-blur-[1px] p-8 rounded-lg shadow-lg w-full max-w-sm z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Đăng nhập</h2>
        <form onSubmit={handleDangNhap}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <MdMailOutline size={22} color="#1F3441" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-2 border-b border-black bg-transparent focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FiLock size={22} color="#1F3441" />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                className="pl-10 w-full p-2 border-b bg-transparent border-black focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-slate-100 transition duration-200"
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin} 
            className="w-full mt-4 flex items-center justify-center bg-transparent text-white font-semibold py-2 px-4 rounded-lg border border-white hover:border-gray-500 hover:bg-opacity-70 transition duration-200"
          >
            <FcGoogle className="w-4 h-4 mr-2" />
            Đăng nhập với Google
          </button>
        </form>

        {thongBao && <p className="text-center text-red-500 mt-4">{thongBao}</p>}
      </div>
    </div>
  );
};

export default Login;
