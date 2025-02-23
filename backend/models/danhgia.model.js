import mongoose from "mongoose";

const danhgiaSchema = new mongoose.Schema(
    {
        soSao: { type: Number, required: true },
        noiDung: { type: String, required: true },
        idDonHang: { type: mongoose.Schema.Types.ObjectId, ref: "Donhang", required: true },
        idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: "Sanpham", required: true },
        khachHangId: { type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", required: true },
        hinhAnh: { type: String }
    },
    {
        timestamps: true
    }
);

const Danhgia = mongoose.model("Danhgia", danhgiaSchema, "Danhgia");

export default Danhgia;
