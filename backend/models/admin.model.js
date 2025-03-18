import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    tenAdmin: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    matKhau: { type: String, required: true }, 
    phanQuyen: { 
      type: [String], 
      required: true,
      enum: ["SUPER_AM", "AM1", "AM2", "CERTIFY"]
    },
    trangThai: { 
      type: String, 
      required: true, 
      enum: ["active", "inactive", "suspended"], 
      default: "active" 
    },
    address:{
      type: String
    },
    encryptedPrivateKey:{
      type: String,
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema, "Admin");

export default Admin;
