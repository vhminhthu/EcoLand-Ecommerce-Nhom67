import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAM } from "../lib/utils/generateTokenAM.js";
import sendEmail from "../lib/utils/sendEmail.js";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import abi from "../abi.js";


const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
const signer = new ethers.Wallet(adminPrivateKey, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = abi; 
const contract = new ethers.Contract(contractAddress, contractABI, signer);
export const createAdmin = async (req, res) => {
  try {
      const { tenAdmin, email, phanQuyen } = req.body;

  
      const validRoles = ["SUPER_AM", "AM1", "AM2", "CERTIFY"];
      if (!validRoles.includes(phanQuyen)) {
          return res.status(400).json({ message: "Quyền hạn không hợp lệ!" });
      }


      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
          return res.status(400).json({ message: "Email này đã tồn tại!" });
      }


      const wallet = ethers.Wallet.createRandom();
      const address = wallet.address;
      const privateKey = wallet.privateKey;


      const rawPassword = CryptoJS.lib.WordArray.random(8).toString();
      const hashedPassword = await bcrypt.hash(rawPassword, 10);


      const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, rawPassword).toString();

      
        const emailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invite to Management Ecoland System</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    border-bottom: 2px solid #4CAF50;
                }
                .header img {
                    max-width: 120px;
                    border-radius: 50%;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .content h2 {
                    color: #333;
                }
                .password-box {
                    background: #f9f9f9;
                    padding: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #4CAF50;
                    border-radius: 5px;
                    display: inline-block;
                    margin-top: 10px;
                }
                .footer {
                    text-align: center;
                    padding: 15px;
                    font-size: 12px;
                    color: #777;
                }
                .footer a {
                    color: #4CAF50;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://i.pinimg.com/736x/9f/93/ae/9f93ae8f39417cd575e735bf5f1b1505.jpg" alt="Company Logo">
                </div>
                <div class="content">
                    <h2>Xin chào, ${tenAdmin}</h2>
                    <p>Hệ thống của chúng tôi đã cấp lại mật khẩu mới cho bạn.</p>
                    <p>Vui lòng sử dụng mật khẩu sau để đăng nhập:</p>
                    <div class="password-box">${rawPassword}</div>
                    <p>Mời bạn tham gia vào hệ thống quản trị cùng chúng tôi</p>
                </div>
                <div class="footer">
                    <p>Nếu bạn có thắc mắc khác, vui lòng liên hệ để hỗ trợ.</p>
                    <p>&copy; 2025 Ecoland. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;

  
      const newAdmin = new Admin({
          tenAdmin,
          email,
          matKhau: hashedPassword,
          phanQuyen: [phanQuyen],
          address,
          encryptedPrivateKey,
      });
      await newAdmin.save();

  
      const tx = await signer.sendTransaction({
          to: address,
          value: ethers.parseEther("2.0")
      });
      await tx.wait();

    
      const tx2 = await contract.connect(signer).themAdmin(address);
      await tx2.wait();


      await sendEmail(email, "Tài khoản quản trị viên Ecoland", emailTemplate);

      res.status(201).json({ message: `Admin ${tenAdmin} đã được tạo, nhận 2 ETH và ghi vào blockchain.` });

  } catch (error) {
      res.status(500).json({ message: "Đã có lỗi xảy ra.", error: error.message });
  }
};



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


