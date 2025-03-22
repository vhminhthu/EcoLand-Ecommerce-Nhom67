import mongoose from "mongoose";

const nguoidungSchema = new mongoose.Schema(
    {
        tenNguoiDung: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        matKhau: { type: String},
        googleId: { type: String, unique: true, sparse: true }, 
        vaiTro: { type: String, default: "customer" },
        trangThai: { type: String },
        anhND: { type: String },
        dsTheoDoi: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", default: [] }],
        dsNguoiTheoDoi: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", default: [] }],
        dsYeuThich: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sanpham", default: [] }],
        soDuTien: { type: Number, default: 0 },
        nguonTien: [
            { 
                loaiTien: { type: String,  enum: ["cộng", "trừ"], },
                soTien: { type: Number },
                ngay: { type: Date, default: Date.now  }, 
                noidung: { type: String },
            }
        ],
        thongTinGiaoHang: 
            {
                hoVaTen: { type: String },
                sdt: { type: String },
                diaChi: { type: String },
            },
        
    },
    {
        timestamps: true
    }
);

const Nguoidung = mongoose.model("Nguoidung", nguoidungSchema, "Nguoidung");

export default Nguoidung;
