import mongoose from "mongoose";

const nguoidungSchema = new mongoose.Schema(
    {
        tenNguoiDung: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        matKhau: { type: String, required: true },
        diaChi: { type: String },
        soDienThoai: { type: String },
        vaiTro: { type: String, default: "customer" },
        trangThai: { type: String },
        anhND: { type: String },
        dsTheoDoi: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", default: [] }],
        dsNguoiTheoDoi: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", default: [] }],
        dsYeuThich: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sanpham", default: [] }]
    },
    {
        timestamps: true
    }
);

const Nguoidung = mongoose.model("Nguoidung", nguoidungSchema, "Nguoidung");

export default Nguoidung;
