import express from "express"
import { addSanPham, getSanPhamById, getTatCaSanPham, goiYTimKiem } from "../controllers/sanpham.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/them", protectRoute, addSanPham)
router.get("/lay/tatca", getTatCaSanPham)
router.get("/lay/:id", getSanPhamById)
router.get("/search/goiy",goiYTimKiem)

export default router