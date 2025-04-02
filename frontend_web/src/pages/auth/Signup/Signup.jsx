import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [tenNguoiDung, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/api/auth/getme", {
          withCredentials: true,
        });

     
          localStorage.setItem("chat-user", JSON.stringify(res.data));
          navigate("/"); 
     

         console.log("hello",res)
      } catch (error) {
        console.log("Chưa đăng nhập", error);
      }
    };

    checkUser();
  }, []);

  

  const handleDangKy = async (e) => {
    e.preventDefault();

    if (!tenNguoiDung || !email || !matKhau) {
      setThongBao('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', {
        tenNguoiDung,
        email,
        matKhau,
      });

      setThongBao('Đăng ký thành công!');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      localStorage.setItem('chat-user', JSON.stringify(response.data));

      navigate("/"); // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      if (error.response) {
        setThongBao(error.response.data.message || 'Lỗi đăng ký. Vui lòng thử lại!');
      } else {
        setThongBao('Lỗi không xác định. Vui lòng thử lại sau!');
      }
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl flex w-full h-[95vh] max-w-6xl">
        
        {/* Left Image Section */}
        <div className="w-4/10 hidden md:block">
          <img src="../../../../src/pages/auth/Signup/green.jpg" alt="Scenic Landscape" className="h-full w-full object-cover rounded-l-xl" />
        </div>

       
        <div className="w-6/10 flex flex-col justify-center !p-20">
          <h2 className="text-3xl font-bold !mb-3 text-green-900">Tạo tài khoản</h2>

       
          <div className="flex gap-3 !mb-6">
            <button onClick={handleGoogleSignup} className="flex items-center justify-center w-full !py-2 bg-green-900 text-white rounded-full font-bold">
              <span className="!mr-2">G</span> Đăng ký với Google
            </button>
          </div>

          <p className="text-gray-500 text-center !mb-2">Đăng ký sử dụng email của bạn</p>

          {/* Form */}
          <form className="!space-y-6" onSubmit={handleDangKy}>
            <div className="flex flex-col">
              <label className="font-semibold text-left !mb-1">Tên người dùng</label>
              <input
                type="text"
                value={tenNguoiDung}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full !py-2 !px-3 bg-gray-100 rounded-full border border-gray-300 text-green-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-left !mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full !py-2 !px-3 bg-gray-100 rounded-full border border-gray-300 text-green-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-left !mb-1">Mật khẩu</label>
              <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                className="w-full !py-2 !px-3 bg-gray-100 rounded-full border border-gray-300 text-green-900"
              />
            </div>
            <button type="submit" className="w-full !py-2 bg-green-900 text-white rounded-full hover:bg-green-800 font-bold text-lg">
              Đăng ký 
            </button>
          </form>

          {thongBao && <p className="text-center text-red-500 mt-4">{thongBao}</p>}

          <p className="!mt-6 text-center text-gray-500">
            Bạn đã có tài khoản? 
            <Link className="text-green-700 font-bold" to="/login"> Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
