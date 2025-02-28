import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAM } from "../lib/utils/generateTokenAM.js";
export const loginAdmin = async (req, res) => {
    try {
      const { tenAdmin, matKhau } = req.body;
  
      const admin = await Admin.findOne({ tenAdmin }).lean(); 
  
      if (!admin) {
        return res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
      }
  
      const kiemTra_matKhau = await bcrypt.compare(matKhau, admin.matKhau);
      if (!kiemTra_matKhau) {
        return res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
      }
  
      if (admin.trangThai !== "active") {
        return res.status(403).json({ error: "Tài khoản của bạn đã bị vô hiệu hóa" });
      }
  
    
  
      generateTokenAM(admin._id, admin.phanQuyen, res);
  
      res.status(200).json({
        tenAdmin: admin.tenAdmin,
        phanQuyen: admin.phanQuyen,
        _id: admin._id,
      });
  
    } catch (error) {
      console.log("Lỗi loginAdmin:", error);
      res.status(500).json({ error: "Lỗi 500" });
    }
  };
  

export const getMeAdmin = async (req, res) => {
    try {

      const admin = await Admin.findById(req.admin._id).select("-matKhau");
  
      if (!admin) {
        return res.status(404).json({ error: "Không tìm thấy admin" });
      }
  
      res.status(200).json(admin);
    } catch (error) {
      console.log("Lỗi getMeAdmin:", error.message);
      res.status(500).json({ error: "Lỗi 500" });
    }
  };
  