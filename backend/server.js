import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Xin chào bạn");
});

app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});