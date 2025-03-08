import Nguoidung from "../models/nguoidung.model.js"

import Sanpham from "../models/sanpham.model.js";

export const yeuThich = async (req, res) => {
    try {   
        const idSP = req.params.id; 
        const idND = req.nguoidung._id;
        const nguoiDung = await Nguoidung.findById(idND);
        if (!nguoiDung) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const index = nguoiDung.dsYeuThich.indexOf(idSP);
        let incrementValue = 0;

        if (index === -1) {
            nguoiDung.dsYeuThich.push(idSP);
            incrementValue = 1;  // Tăng khi thêm vào yêu thích
        } else {
            nguoiDung.dsYeuThich.splice(index, 1);
            incrementValue = -1; // Giảm khi bỏ yêu thích
        }
        await nguoiDung.save();

        await Sanpham.updateOne({ _id: idSP }, { $inc: { yeuThich: incrementValue } });

        return res.status(200).json({
            message: index === -1 ? "Đã thêm vào danh sách yêu thích" : "Đã xóa khỏi danh sách yêu thích",
            yeuThichSP: nguoiDung.dsYeuThich,
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi yêu thích controller", error.message);
    }
};

export const updateThongTinGiaoHang = async (req, res) => {
    try {
        const { hoVaTen, sdt, diaChi } = req.body;
        const idND = req.nguoidung._id;

        if (!hoVaTen || !sdt || !diaChi) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        }

        const updated = await Nguoidung.findByIdAndUpdate(
            idND,
            { thongTinGiaoHang: { hoVaTen, sdt, diaChi } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        res.status(200).json({ message: "Cập nhật thành công", nguoidung: updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};



