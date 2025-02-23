import mongoose from "mongoose";

const thongbaoSchema = new mongoose.Schema(
    {
        idNguoidung: { type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", required: true },
        noiDung: { type: String, required: true },
        loaiThongBao: { type: String, required: true },
        trangThai: { type: String, required: true },
        urlDichVu: { type: String },
        ngayThongBao: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

const Thongbao = mongoose.model("Thongbao", thongbaoSchema, "Thongbao");

export default Thongbao;
