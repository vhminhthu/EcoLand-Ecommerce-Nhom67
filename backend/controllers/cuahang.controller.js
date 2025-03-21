import CuaHang from "../models/cuahang.model.js";
import {v2 as cloudinary} from 'cloudinary'
import SanPham from "../models/sanpham.model.js";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import abi from "../abi.js";
import Admin from "../models/admin.model.js";
import Nguoidung from "../models/nguoidung.model.js";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
const signer = new ethers.Wallet(adminPrivateKey, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = abi; 
const contract = new ethers.Contract(contractAddress, contractABI, signer);

export const addCuaHang = async (req, res) => {
    try {
        const idND = req.nguoidung._id;
        const { tenCH, diaChiCH, emailCH, soDienThoaiCH, thongTinThue, thongTinDinhDanh } = req.body;

        //console.log(req.body);

        if (!tenCH || !diaChiCH || !emailCH || !soDienThoaiCH || !thongTinThue || !thongTinDinhDanh) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
        }

        let hinhDinhDanhUrl = thongTinDinhDanh.hinhChup; 

        if (thongTinDinhDanh.hinhChup) {
            try {
                const uploadResult = await cloudinary.uploader.upload(thongTinDinhDanh.hinhChup);
                hinhDinhDanhUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.log("Lỗi upload ảnh định danh (cũng là ảnh cửa hàng):", uploadError.message);
                return res.status(500).json({ error: "Lỗi khi upload ảnh định danh lên Cloudinary" });
            }
        }

        const newCuaHang = new CuaHang({
            tenCH,
            idNguoiDung: idND,
            diaChiCH,
            emailCH,
            soDienThoaiCH,
            thongTinThue,
            thongTinDinhDanh: {
                ...thongTinDinhDanh,
                hinhChup: hinhDinhDanhUrl, 
            },
        });

        await newCuaHang.save();
        res.status(201).json({ message: "Thêm cửa hàng thành công!", cuaHang: newCuaHang });

    } catch (error) {
        console.error("Lỗi khi thêm cửa hàng:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

export const duyetCuaHang = async (req, res) => {
    try {
        const adminId = req.admin._id;
        const { trangThai, nguyenNhanTC, matKhau } = req.body;
        const { idCuaHang } = req.params;

        const cuaHang = await CuaHang.findById(idCuaHang);
        if (!cuaHang) {
            return res.status(404).json({ message: "Cửa hàng không tồn tại!" });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(403).json({ message: "Không tìm thấy admin!" });
        }

        // Giải mã private key của admin
        let privateKey;
        try {
            privateKey = CryptoJS.AES.decrypt(admin.encryptedPrivateKey, matKhau).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            return res.status(403).json({ message: "Mật khẩu không hợp lệ!" });
        }

        if (!privateKey || privateKey.trim() === "") {
            return res.status(403).json({ message: "Private Key không hợp lệ hoặc trống!" });
        }

        // Khởi tạo provider, signer, và contract
        // const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
        // const contractAddress = process.env.CONTRACT_ADDRESS;
        // const contractABI = abi;

        // const signer = new ethers.Wallet(privateKey, provider);
        // const contract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Signer được khởi tạo:", signer.address);
        console.log("Contract được khởi tạo tại:", contractAddress);

        if (trangThai === "Đã duyệt") {
            try {
                console.log("Đang gửi giao dịch tạo cửa hàng lên Blockchain...");
                const tx = await contract.createStore(
                    idCuaHang,
                    cuaHang.tenCH,
                    { gasLimit: 500000, gasPrice: ethers.parseUnits("5", "gwei") }
                );
                console.log("Giao dịch đã gửi:", tx.hash);
                await tx.wait();
                console.log("Giao dịch hoàn tất trên blockchain!");                
            } catch (err) {
                console.error("Lỗi khi gửi giao dịch:", err);
                return res.status(500).json({ message: "Lỗi khi gửi giao dịch lên blockchain", error: err.message });
            }
        }

        if (trangThai === "Từ chối" && nguyenNhanTC) {
            cuaHang.nguyenNhanTC = nguyenNhanTC;
        }

        cuaHang.trangThaiCH = trangThai;
        await cuaHang.save();

        return res.json({ message: "Cập nhật trạng thái thành công!", cuaHang });
    } catch (error) {
        console.error("Lỗi cập nhật sản phẩm:", error);
        return res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

export const getAllCuaHang = async (req, res) => {
    try {
        const cuaHangs = await CuaHang.find({ trangThaiCH: 'Mở cửa' })
            .select("tenCH dsQuangCao diaChiCH")
            .populate({ path: "idNguoiDung", select: "dsNguoiTheoDoi" })
            .lean();

        for (let cuaHang of cuaHangs) {
            const sanPhams = await SanPham.find({ idCH: cuaHang._id });
            
            let tongSoSao = 0;
            let tongSoDanhGia = 0;
            let tongSanPham = sanPhams.length;
            
            sanPhams.forEach(sp => {
                tongSoSao += sp.tongSoSao;
                tongSoDanhGia += sp.tongSoDanhGia;
            });
            
            cuaHang.tongSanPham = tongSanPham;
            cuaHang.tongSoDanhGia = tongSoDanhGia;
            cuaHang.trungBinhSao = tongSoDanhGia > 0 ? (tongSoSao / tongSoDanhGia).toFixed(2) : 0;
        }

        res.status(200).json(cuaHangs);
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};


export const getCuaHangById = async (req, res) => {
    try {
        const { id } = req.params;
        const idND = req.nguoidung._id;

        const cuaHang = await CuaHang.findOne({ _id: id })
            .select("tenCH dsQuangCao diaChiCH createdAt anhCH")
            .populate({ path: "idNguoiDung", select: "dsNguoiTheoDoi" })
            .lean();

        if (!cuaHang) {
            return res.status(404).json({ success: false, message: "Cửa hàng không tồn tại hoặc đã đóng cửa." });
        }

        const sanPhams = await SanPham.find({ idCH: cuaHang._id });

        let tongSoSao = 0;
        let tongSoDanhGia = 0;
        let tongSanPham = sanPhams.length;

        sanPhams.forEach(sp => {
            tongSoSao += sp.tongSoSao;
            tongSoDanhGia += sp.tongSoDanhGia;
        });

        cuaHang.tongSanPham = tongSanPham;
        cuaHang.tongSoDanhGia = tongSoDanhGia;
        cuaHang.trungBinhSao = tongSoDanhGia > 0 ? (tongSoSao / tongSoDanhGia).toFixed(2) : 0;

        let daTheoDoi = false;
        const nguoiDung = await Nguoidung.findById(cuaHang.idNguoiDung).select("dsNguoiTheoDoi");
        if (nguoiDung) {
            daTheoDoi = nguoiDung.dsNguoiTheoDoi.includes(idND.toString());
        }

        res.status(200).json({ ...cuaHang, daTheoDoi });
    } catch (error) {
        console.error("Lỗi khi lấy cửa hàng theo ID:", error);
        res.status(500).json({ success: false, message: "Lỗi server!", error: error.message });
    }
};

export const theoDoi = async (req, res) => {
    try {
        const { id } = req.params; 
        const idND = req.nguoidung._id;

        const cuaHang = await CuaHang.findById(id);
        if (!cuaHang) {
            return res.status(404).json({ success: false, message: "Cửa hàng không tồn tại hoặc đã đóng cửa." });
        }

        const nguoiDungCH = await Nguoidung.findById(cuaHang.idNguoiDung);
        if (!nguoiDungCH) {
            return res.status(404).json({ success: false, message: "Không tìm thấy chủ cửa hàng." });
        }

        const nguoiDung = await Nguoidung.findById(idND);
        if (!nguoiDung) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng." });
        }

        if (!nguoiDungCH.dsNguoiTheoDoi) nguoiDungCH.dsNguoiTheoDoi = [];
        if (!nguoiDung.dsTheoDoi) nguoiDung.dsTheoDoi = [];

        const daTheoDoi = nguoiDung.dsTheoDoi.includes(cuaHang.idNguoiDung);

        if (daTheoDoi) {
            nguoiDungCH.dsNguoiTheoDoi = nguoiDungCH.dsNguoiTheoDoi.filter(userId => userId.toString() !== idND.toString());
            nguoiDung.dsTheoDoi = nguoiDung.dsTheoDoi.filter(shopId => shopId.toString() !== cuaHang.idNguoiDung.toString());
        } else {
            nguoiDungCH.dsNguoiTheoDoi.push(idND);
            nguoiDung.dsTheoDoi.push(cuaHang.idNguoiDung);
        }

        await nguoiDungCH.save();
        await nguoiDung.save();

        res.status(200).json({ 
            success: true, 
            message: daTheoDoi ? "Đã bỏ theo dõi" : "Đã theo dõi", 
            nguoiDung
        });
    } catch (error) {
        console.error("Lỗi khi theo dõi cửa hàng:", error);
        res.status(500).json({ success: false, message: "Lỗi server!", error: error.message });
    }
};

export const capNhat = async (req, res) => {
    let {anhCH} = req.body; 
    const id = req.nguoidung._id;
    try {
        let cuaHang = await CuaHang.findOne({idNguoiDung: id});
        if (!cuaHang) return res.status(404).json({ message: "Không tìm thấy cửa hàng" });

        if (anhCH) {
        
            if (cuaHang.anhCH) {
                await cloudinary.uploader.destroy(cuaHang.anhCH.split("/").pop().split(".")[0]);
            }
        
            const uploadedResponse = await cloudinary.uploader.upload(anhCH);
            anhCH = uploadedResponse.secure_url;
        }

        cuaHang.anhCH = anhCH|| cuaHang.anhCH;

        cuaHang = await cuaHang.save();

        return res.status(200).json(cuaHang.anhCH);
    } catch (error) {
        console.log("Lỗi capNhat controller:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getAnhCH = async (req, res) => {
    try {
        const idND = req.nguoidung._id;

        const cuaHang = await CuaHang.findOne({ idNguoiDung: idND });

        if (!cuaHang) {
            return res.status(404).json({ success: false, message: "Cửa hàng không tồn tại hoặc đã đóng cửa." });
        }

        res.status(200).json(cuaHang.anhCH);
    } catch (error) {
        console.error("Lỗi khi lấy cửa hàng theo ID:", error);
        res.status(500).json({ success: false, message: "Lỗi server!", error: error.message });
    }
};

export const getPopularShops = async (req, res) => {
    try {
        const users = await Nguoidung.aggregate([
            {
                $project: {
                    soTheoDoi: { $size: "$dsNguoiTheoDoi" }
                }
            },
            {
                $sort: { soTheoDoi: -1 } 
            },
            {
                $limit: 9 
            }
        ]);
    
        const usersWithStores = [];

        for (const user of users) {
            const cuaHangs = await CuaHang.find({ idNguoiDung: user._id, trangThaiCH: 'Mở cửa' })
                .select("anhCH tenCH diaChiCH")
                .populate({ path: "idNguoiDung", select: "dsNguoiTheoDoi" })
                .lean();

            for (let cuaHang of cuaHangs) {
                const sanPhams = await SanPham.find({ idCH: cuaHang._id });
                
                let tongSoSao = 0;
                let tongSoDanhGia = 0;
                let tongSanPham = sanPhams.length;
                
                sanPhams.forEach(sp => {
                    tongSoSao += sp.tongSoSao;
                    tongSoDanhGia += sp.tongSoDanhGia;
                });
                
                cuaHang.tongSanPham = tongSanPham;
                cuaHang.tongSoDanhGia = tongSoDanhGia;
                cuaHang.trungBinhSao = tongSoDanhGia > 0 ? (tongSoSao / tongSoDanhGia).toFixed(2) : 0;

                usersWithStores.push({ cuaHang });
            }
        }

        res.status(200).json({ usersWithStores });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Có lỗi xảy ra khi lấy dữ liệu." });
    }
};



