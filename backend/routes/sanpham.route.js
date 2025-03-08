import express from "express"
import { addSanPham, capNhatLuotXem, getSanPhamById, getSanPhamByIdCH, getSanPhamByIdDM, getTatCaSanPham, getTatCaSanPhamDM, goiYTimKiem, timKiem } from "../controllers/sanpham.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/them", protectRoute, addSanPham)
router.get("/lay/tatca", getTatCaSanPham)
router.get("/lay/tatca/danhmuc", getTatCaSanPhamDM)

router.get("/lay/:id",protectRoute, getSanPhamById)
router.get("/laytheocuahang/:id",protectRoute, getSanPhamByIdCH)

router.get("/search/goiy",goiYTimKiem)


router.put("/capnhat/luotxem/:id",capNhatLuotXem)
router.get("/search/timkiem",timKiem)

//router.get("/lay/danhmuc",getSanPhamByIdDM)
router.get("/lay/danhmuc/sp",getSanPhamByIdDM)
router.get("/lay/cuahang/sp", getSanPhamByIdCH)

export default router