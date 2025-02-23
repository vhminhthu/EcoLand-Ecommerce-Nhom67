import mongoose from "mongoose";

const sanphamSchema = new mongoose.Schema(
    {
        tenSP: { type: String, required: true },
        moTaSP: { type: String },
        idDM: { type: mongoose.Schema.Types.ObjectId, ref: "Danhmuc", required: true },
        idCH: { type: mongoose.Schema.Types.ObjectId, ref: "CuaHang", required: true },
        dsYeuThich: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", default: [] }],
        phanLoai: [
            {
                tenLoai: { type: String, required: true },
                giaLoai: { type: Number, required: true },
                donVi: { type: String, required: true },
                khuyenMai: { type: Number, default: 0 }
            }
        ],
        trangThai: { type: String, required: true },
        luotXem: { type: Number, default: 0 },
        khoHang: { type: Number, required: true },
        daBan: { type: Number, default: 0 },
        dsAnhSP: [{ type: String, default: [] }],
        chungNhan: [
            {
                tenCN: { type: String, required: true },
                anhCN: { type: String, required: true },
                ngayNhanCN: { type: Date, required: true },
                noiCapCN: { type: String, required: true }
            }
        ],
        nguonGoc: { type: String },
        tongSoSao: { type: Number, default: 0 },
        tongSoDanhGia: { type: Number, default: 0 },
        dsDanhGia: [{ type: mongoose.Schema.Types.ObjectId, ref: "Danhgia", default: [] }]
    },
    {
        timestamps: true
    }
);

const Sanpham = mongoose.model("Sanpham", sanphamSchema, "Sanpham");

export default Sanpham;