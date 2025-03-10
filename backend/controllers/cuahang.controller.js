import CuaHang from "../models/cuahang.model.js";
import {v2 as cloudinary} from 'cloudinary'
import SanPham from "../models/sanpham.model.js";
import mongoose from "mongoose";

export const addCuaHang = async (req, res) => {
    try {
        const idND = req.nguoidung._id;
        const { tenCH, diaChiCH, emailCH, soDienThoaiCH, thongTinThue, thongTinDinhDanh } = req.body;

        console.log(req.body);

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

        const cuaHang = await CuaHang.findOne({ _id: id, trangThaiCH: 'Mở cửa' })
            .select("tenCH dsQuangCao diaChiCH createdAt")
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

        res.status(200).json(cuaHang);
    } catch (error) {
        console.error("Lỗi khi lấy cửa hàng theo ID:", error);
        res.status(500).json({ success: false, message: "Lỗi server!", error: error.message });
    }
};
