import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        tenAdmin: { type: String, required: true, unique: true },
        matKhau: { type: String, required: true },
        phanQuyen: { 
          type: String, 
          required: true, 
        },
        trangThai: { 
          type: String, 
          required: true, 
          enum: ["active", "inactive", "suspended"], 
          default: "active" 
        }
      },
      {
        timestamps: true
      }    
);

const Admin = mongoose.model("Admin", adminSchema, "Admin");

export default Admin;