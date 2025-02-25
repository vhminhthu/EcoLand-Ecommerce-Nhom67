import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth.route.js"
import danhmucRoutes from "./routes/danhmuc.route.js"
import sanphamRoutes from "./routes/sanpham.route.js"

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(morgan("tiny"));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use("/api/auth",authRoutes)
app.use("/api/danhmuc",danhmucRoutes)
app.use("/api/sanpham",sanphamRoutes)

app.get("/", (req, res) => {
    res.send("Xin chào bạn");
});

app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});