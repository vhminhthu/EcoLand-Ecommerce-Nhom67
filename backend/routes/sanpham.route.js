import express from "express"
import { addSanPham, getSanPhamById, getTatCaSanPham, goiYTimKiem } from "../controllers/sanpham.controller.js"
const router = express.Router()

router.post("/them", addSanPham)
router.get("/lay/tatca", getTatCaSanPham)
router.get("/lay/:id", getSanPhamById)
router.get("/search/goiy",goiYTimKiem)

export default router