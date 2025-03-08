import Donhang from "../models/donhang.model.js";
import Giohang from "../models/giohang.model.js"; 

export const themDonHang = async (req, res) => {
    try {
        const {
            thongTinGiaoHang,
            dsSanPham,
            tongTienHang,
            luuY,
            phiVanChuyen,
            phuongThucThanhToan,
            tongTienThanhToan,
            cuaHangId,
        } = req.body;
        const idND = req.nguoidung._id;
        console.log(dsSanPham);


        if (!thongTinGiaoHang || !dsSanPham || !tongTienHang || !phuongThucThanhToan || !tongTienThanhToan || !cuaHangId) {
            return res.status(400).json({ message: "Thiếu thông tin cần thiết!" });
        }

        if (!Array.isArray(dsSanPham) || dsSanPham.length === 0) {
            return res.status(400).json({ message: "Danh sách sản phẩm không hợp lệ!" });
        }

        const newOrder = new Donhang({
            thongTinGiaoHang,
            dsSanPham,
            tongTienHang,
            luuY,
            phiVanChuyen,
            phuongThucThanhToan,
            tongTienThanhToan,
            cuaHangId,
            khachHangId: idND,
            ngayDat: new Date(),
        });

        const savedOrder = await newOrder.save();

        const giohang = await Giohang.findOne({ idND });

        if (!giohang) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });
        }

        // Lọc lại từng cửa hàng
        giohang.sanPhams = giohang.sanPhams.map((cuaHang) => {
            if (cuaHang.idCH.toString() === cuaHangId.toString()) {
                // Giữ lại các sản phẩm không có trong dsSanPham
                cuaHang.sanPhamChiTiet = cuaHang.sanPhamChiTiet.filter(
                    (sp) => !dsSanPham.some(
                        (item) => item.idSP.toString() === sp.idSP.toString() &&
                                item.phanLoai.id === sp.idLoai
                    )
                );
            }
            return cuaHang;
        }).filter(cuaHang => cuaHang.sanPhamChiTiet.length > 0); // Xóa cửa hàng nếu không còn sản phẩm

        await giohang.save();

        return res.status(201).json({
            message: "Đơn hàng đã được tạo thành công!",
            donhang: savedOrder
        });
    } catch (error) {
        console.error("Lỗi khi thêm đơn hàng:", error);
        return res.status(500).json({ message: "Lỗi máy chủ!", error: error.message });
    }
};
