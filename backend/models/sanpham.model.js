import mongoose from "mongoose";

const sanphamSchema = new mongoose.Schema(
    {
        tenSP: { type: String, required: true },
        moTaSP: { type: String },
        idDM: { type: mongoose.Schema.Types.ObjectId, ref: "Danhmuc"},
        idCH: { type: mongoose.Schema.Types.ObjectId, ref: "Cuahang" },
        yeuThich: { type: Number, default: 0 },
        phanLoai: [
            {
                id: { type: Number },
                tenLoai: { type: String, required: true },
                giaLoai: { type: Number, required: true },
                donVi: { type: String, required: true },
                khuyenMai: { type: Number, default: 0 },
                khoHang: { type: Number, default: 0 },
            }
        ],
        trangThai: { type: String, default: "Chờ xác nhận"},
        luotXem: { type: Number, default: 0 },
        daBan: { type: Number, default: 0 },
        dsAnhSP: { type: String },
        chungNhan: [
            {
                id: { type: Number },
                tenCN: { type: String },
                anhCN: { type: String },
                ngayNhanCN: { type: String },
                noiCapCN: { type: String }
            }
        ],
        nguonGoc: { type: String },
        tongSoSao: { type: Number, default: 0 },
        tongSoDanhGia: { type: Number, default: 0 },
        dsDanhGia: [{ type: mongoose.Schema.Types.ObjectId, ref: "Danhgia", default: [] }],
        dsDonHang: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donhang", default: [] }]
    },
    {
        timestamps: true
    }
);

const Sanpham = mongoose.model("Sanpham", sanphamSchema, "Sanpham");

export default Sanpham;