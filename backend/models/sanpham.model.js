import mongoose from "mongoose";

const sanphamSchema = new mongoose.Schema(
    {
        tenSP: { type: String, required: true },
        moTaSP: { type: String },
        idDM: { type: mongoose.Schema.Types.ObjectId, ref: "Danhmuc", required: true },
        idCH: { type: mongoose.Schema.Types.ObjectId, ref: "Cuahang", required: true },
        yeuThich: { type: Number, default: 0 },
        phanLoai: [
            {
                idPL: { type: String, required: true }, 
                tenLoai: { type: String, required: true },
                giaLoai: { type: Number, required: true },
                donVi: { type: String, required: true },
                khuyenMai: { type: Number, default: 0 },
                khoHang: { type: Number, default: 0 },
                daBan: { type: Number, default: 0 },
            }
        ],
        trangThai: { type: String, default: "Chờ xác nhận" },
        luotXem: { type: Number, default: 0 },
        dsAnhSP: { type: String },
        nguonGoc: { type: String },
        tongSoSao: { type: Number, default: 0 },
        tongSoDanhGia: { type: Number, default: 0 },
        dsDanhGia: [{ type: mongoose.Schema.Types.ObjectId, ref: "Danhgia", default: [] }],
        dsDonHang: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donhang", default: [] }],

        
        ngaySX: { type: Date, required: true }, 
        ngayTH: { type: Date, required: true }, 
        VatTuHTCT: { type: String, required: true }, 
        batchId: { type: String, required: true },
        nguyenNhanTC:{type: String}

    },
    {
        timestamps: true
    }
);

const Sanpham = mongoose.model("Sanpham", sanphamSchema, "Sanpham");

export default Sanpham;
