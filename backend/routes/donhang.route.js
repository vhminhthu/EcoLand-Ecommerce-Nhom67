import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { capNhatTrangThaiDonHang, getDoanhThu, getDonHangCXN, getSanPhamBanChay, getTinhTrangDonHang, layDonHangTheoCuaHang, layDonHangTheoId, layDonHangTheoNguoiDung, themDonHang } from "../controllers/donhang.controller.js"
const router = express.Router()

router.post("/them",protectRoute, themDonHang)
router.get("/lay/theonguoidung",protectRoute, layDonHangTheoNguoiDung)
router.get("/lay/theocuahang",protectRoute,layDonHangTheoCuaHang)
router.get("/lay/theoid/:id",layDonHangTheoId)
router.put("/capnhat/:id",protectRoute,capNhatTrangThaiDonHang)

router.get("/lay/doanh-thu", protectRoute, getDoanhThu)
router.get("/lay/tinh-trang-don-hang",protectRoute, getTinhTrangDonHang)
router.get("/lay/don-hang-cxn", protectRoute, getDonHangCXN)
router.get("/lay/san-pham-ban-chay", protectRoute, getSanPhamBanChay)

export default router