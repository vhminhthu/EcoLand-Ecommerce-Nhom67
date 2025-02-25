import Danhmuc from '../models/danhmuc.model.js'

export const addDanhMuc = async (req, res) => {
    try {
        const { tenDM } = req.body;

        // Kiểm tra nếu danh mục đã tồn tại
        const danhMucTonTai = await Danhmuc.findOne({ tenDM });
        if (danhMucTonTai) {
            return res.status(400).json({ message: "Danh mục đã tồn tại!" });
        }

        // Tạo danh mục mới
        const danhMucMoi = new Danhmuc({ tenDM });
        await danhMucMoi.save();

        res.status(201).json({ message: "Danh mục đã được tạo!", data: danhMucMoi });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

export const getDanhMuc = async (req, res) => {
    try {
        const danhMucList = await Danhmuc.find(); // Lấy toàn bộ danh mục
        res.status(200).json(danhMucList);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};
