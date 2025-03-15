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

   
    const rolesArray = Array.isArray(admin.phanQuyen) ? admin.phanQuyen : [admin.phanQuyen];


    const formattedRoles = rolesArray.map(role => String(role).toUpperCase());

    console.log("Quyền admin sau khi xử lý:", formattedRoles);

  
    const validAdminRoles = ["SUPER_AM", "AM1", "AM2", "CERTIFY"];

 
    if (!formattedRoles.some(role => validAdminRoles.includes(role))) {
      return res.status(403).json({ error: "Bạn không có quyền truy cập" });
    }

 
    generateTokenAM(admin._id, formattedRoles, res);

    res.status(200).json({
      tenAdmin: admin.tenAdmin,
      phanQuyen: formattedRoles, 
      _id: admin._id,
    });

  } catch (error) {
    console.log("Lỗi loginAdmin:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};


  

export const getMeAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-matKhau");

    if (!admin) {
      return res.status(404).json({ error: "Không tìm thấy admin" });
    }

    console.log("Admin từ DB:", admin);

   
    const validAdminRoles = ["SUPER_AM", "AM1", "AM2", "CERTIFY"];

  
    if (!Array.isArray(admin.phanQuyen) || !admin.phanQuyen.some(role => validAdminRoles.includes(role))) {
      return res.status(403).json({ error: "Bạn không có quyền truy cập" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.log("Lỗi getMeAdmin:", error.message);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
