import mongoose from "mongoose";

const cuahangSchema = new mongoose.Schema(
    {
        tenCH: { type: String, required: true },
        anhCH: { type: String },
        moTaCH: { type: String },
        idNguoiDung: { type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", required: true },
        dsQuangCao: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quangcao", default: [] }],
        dsSanPham: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sanpham", default: [] }],
        diaChiCH: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Cuahang = mongoose.model("Cuahang", cuahangSchema, "Cuahang");

export default Cuahang;
