import Baocao from "../models/baocao.model.js";

export const addBaoCao = async (req, res) => {
    try {
        const idND = req.nguoidung._id;
        const { id } = req.params;
        const { loaiBaoCao, noiDung } = req.body;

        if (!loaiBaoCao || !noiDung) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
        }

        const newBaocao = new Baocao({
            idNguoiDung: idND,
            idSanPham: id,
            loaiBaoCao,
            noiDung,
        });

        await newBaocao.save();
        res.status(201).json({ message: "Thêm báo cáo thành công!", baocao: newBaocao });
    } catch (error) {
        console.error("Lỗi khi thêm báo cáo:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};