import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        tenAdmin: { type: String, required: true },
        matKhau: { type: String, required: true },
        phanQuyen: { type: String, required: true },
        trangThai: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Admin = mongoose.model("Admin", adminSchema, "Admin");

export default Admin;