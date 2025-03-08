import Giaodich from "../models/giaodich.model.js"; // Import model đơn hàng
import Donhang from "../models/donhang.model.js"; // Import model đơn hàng

export const themGiaoDich = async (req, res) => {
    try {
        const {
            idDonHang,
            soTien,
            dongTien,
            loaiGiaoDich,
            thongTinGiaoDich,
        } = req.body;
        // const idND = req.nguoidung._id;

        if (!idDonHang || !soTien || !dongTien || !loaiGiaoDich || !thongTinGiaoDich) {
            return res.status(400).json({ message: "Thiếu thông tin cần thiết!" });
        }

        const donHang = await Donhang.findById(idDonHang);
        if (!donHang) {
            return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
        }

        const idND = donHang.khachHangId;

        const newGiaoDich = new Giaodich({
            idDonHang,
            idNguoiDungGD: idND,
            soTien,
            dongTien,
            loaiGiaoDich,
            thongTinGiaoDich,
        });

        const savedGiaoDich= await newGiaoDich.save();

        donHang.idGiaoDich = savedGiaoDich._id;
        await donHang.save();

        return res.status(201).json({
            message: "Giao dịch đã được thêm thành công!",
            giaoDichId: savedGiaoDich._id
        });
    } catch (error) {
        console.error("Lỗi khi thêm giao dịch:", error);
        return res.status(500).json({ message: "Lỗi máy chủ!", error: error.message });
    }
};

export const getGiaoDichById = async (req, res) => {
    try {
        const { id } = req.params;
        const giaodich = await Giaodich.findById(id);
        if (!giaodich) {
            return res.status(404).json({ message: "Không tìm thấy giao dịch!" });
        }

        res.status(200).json({ giaodich });
    } catch (error) {
        console.error("Lỗi khi lấy giao dịch:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};