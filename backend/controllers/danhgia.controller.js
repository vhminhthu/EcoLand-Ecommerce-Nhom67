import Danhgia from "../models/danhgia.model.js"; 
import Donhang from "../models/donhang.model.js"; 

export const themDanhGia = async (req, res) => {
    try {
        const idND = req.nguoidung._id;
        const { soSao, noiDung, idDonHang } = req.body;

        if (!soSao || !noiDung || !idDonHang) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin đánh giá!" });
        }

        const danhGiaMoi = new Danhgia({
            soSao,
            noiDung,
            idDonHang,
            khachHangId: idND,
        });

        await danhGiaMoi.save();

        const donHang = await Donhang.findOne({ _id: idDonHang });

        if (!donHang) {
            return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
        }
        
        if (donHang.idDanhGia) {
            return res.status(400).json({ message: "Đơn hàng đã có đánh giá!" });
        }
        
        donHang.idDanhGia = danhGiaMoi._id;
        
        await donHang.save();

        res.status(201).json({ message: "Đánh giá đã được thêm thành công!", review: danhGiaMoi });
    } catch (error) {
        console.error("Lỗi khi thêm đánh giá:", error);
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

