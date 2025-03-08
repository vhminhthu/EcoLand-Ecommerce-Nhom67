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
        const danhSachCuaHang = await CuaHang.aggregate([
            {
                $match: { trangThaiCH: "Mở cửa" }
            },
            {
                $lookup: {
                    from: "Sanpham", 
                    localField: "_id",
                    foreignField: "idCH",
                    as: "sanPhams"
                }
            },
            {
                $addFields: {
                    tongSanPhamCH: { $size: "$sanPhams" },
                    tongSoDanhGiaCH: { $sum: "$sanPhams.tongSoDanhGia" },
                    tongSoSaoCH: { $sum: "$sanPhams.tongSoSao" }
                }
            },
            {
                $addFields: {
                    trungBinhSaoCH: {
                        $cond: {
                            if: { $gt: ["$tongSoDanhGiaCH", 0] },
                            then: { $divide: ["$tongSoSaoCH", "$tongSoDanhGiaCH"] },  // Tính trung bình sao
                            else: 0  
                        }
                    }
                }
            },
            {
                $project: { // Chỉ lấy các trường cần thiết
                    _id: 1,
                    tenCH: 1,
                    dsQuangCao: 1,
                    diaChiCH: 1,
                    tongSanPhamCH: 1,
                    tongSoDanhGiaCH: 1,
                    tongSoSaoCH:1,
                    trungBinhSaoCH: 1,
                    idNguoiDung: 1 
                }
            }
        ]);

        const danhSachCuaHangPopulated = await CuaHang.populate(danhSachCuaHang, {
            path: "idNguoiDung",
            select: "dsNguoiTheoDoi"
        });

        console.log(danhSachCuaHangPopulated)

        res.status(200).json(danhSachCuaHangPopulated);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách cửa hàng:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

export const getCuaHangById = async (req, res) => {
    try {
        const { id } = req.params;

        const cuaHang = await CuaHang.aggregate([
            {
                $match: { 
                    _id: new mongoose.Types.ObjectId(id),
                    trangThaiCH: "Mở cửa"
                }
            },
            {
                $lookup: {
                    from: "Sanpham",
                    localField: "_id",
                    foreignField: "idCH",
                    as: "sanPhams"
                }
            },
            {
                $addFields: {
                    tongSanPham: { $size: "$sanPhams" },
                    tongSoDanhGiaCH: { $sum: "$sanPhams.tongSoDanhGia" },
                    tongSoSaoCH: { $sum: "$sanPhams.tongSoSao" }
                }
            },
            {
                $addFields: {
                    trungBinhSaoCH: {
                        $cond: {
                            if: { $gt: ["$tongSoDanhGiaCH", 0] },
                            then: { $divide: ["$tongSoSaoCH", "$tongSoDanhGiaCH"] },
                            else: 0
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    tenCH: 1,
                    createdAt:1,
                    dsQuangCao: 1,
                    diaChiCH: 1,
                    tongSanPham: 1,
                    tongSoDanhGiaCH: 1,
                    tongSoSaoCH: 1,
                    trungBinhSaoCH: 1,
                    idNguoiDung: 1,
                }
            }
        ]);

        if (!cuaHang || cuaHang.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy cửa hàng!" });
        }

        const cuaHangPopulated = await CuaHang.populate(cuaHang, {
            path: "idNguoiDung",
            select: "dsNguoiTheoDoi"
        });

        res.status(200).json(cuaHangPopulated[0]);
    } catch (error) {
        console.error("Lỗi khi lấy cửa hàng theo ID:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};
