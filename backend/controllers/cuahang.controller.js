import CuaHang from "../models/cuahang.model.js";
import {v2 as cloudinary} from 'cloudinary'

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
