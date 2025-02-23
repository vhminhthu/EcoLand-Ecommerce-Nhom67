import mongoose from "mongoose";

const tinnhanSchema = new mongoose.Schema(
    {
        noiDung: { type: String, required: true },
        idNguoiDungGui: { type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", required: true },
        idNguoiDungNhan: { type: mongoose.Schema.Types.ObjectId, ref: "Nguoidung", required: true },
        trangThai: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Tinnhan = mongoose.model("Tinnhan", tinnhanSchema, "Tinnhan");

export default Tinnhan;
