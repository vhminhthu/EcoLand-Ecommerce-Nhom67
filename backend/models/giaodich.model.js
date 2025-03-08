import mongoose from "mongoose";

const giaodichSchema = new mongoose.Schema(
    {
        idDonHang: { type: mongoose.Schema.Types.ObjectId, ref: "Donhang", required: true },
        idNguoiDungGD: { type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung" },
        soTien: { type: Number, required: true },
        dongTien: { type: String, required: true },
        // noiDung: { type: String, required: true },
        loaiGiaoDich: { type: String, required: true },
        // trangThai: { type: String, required: true },
        thongTinGiaoDich: {
            maGiaoDich: { type: Number, required: true },
            trangThaiThanhToan: { type: String, required: true },
            loaiThanhToan: { type: String },
            loaiThe: { type: String },
            loaiGiaoDich: { type: String },
            soTien: { type: Number },
            ngayGiaoDich: { type: Date, default: Date.now }
        }
    },
    {
        timestamps: true
    }
);

const Giaodich = mongoose.model("Giaodich", giaodichSchema, "Giaodich");

export default Giaodich;