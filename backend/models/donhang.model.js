import mongoose from "mongoose";

const donhangSchema = new mongoose.Schema(
    {
        trangThai: { type: String, required: true },
        tongTien: { type: Number, required: true },
        dsSanPham: [
            {
                idSP: { type: mongoose.Schema.Types.ObjectId, ref: "Sanpham", required: true },
                phanLoai: [ 
                    {
                        tenLoai: { type: String, required: true },
                        giaLoai: { type: Number, required: true },
                        donVi: { type: String, required: true },
                        khuyenMai: { type: Number, default: 0 }
                    }
                ]
            }
        ],
        nguoiBanId: { type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", required: true },
        khachHangId: { type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", required: true },
        ngayDat: { type: Date, default: Date.now },
        ngayGiao: { type: Date },
        ngayHoanThanh: { type: Date },
        idGiaoDich: { type: mongoose.Schema.Types.ObjectId, ref: "GiaoDich" },
        idVanChuyen: { type: mongoose.Schema.Types.ObjectId, ref: "VanChuyen" },
        phuongThucThanhToan: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Donhang = mongoose.model("Donhang", donhangSchema, "Donhang");

export default Donhang;
