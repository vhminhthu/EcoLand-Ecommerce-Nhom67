import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { updateThongTinGiaoHang, yeuThich } from "../controllers/nguoidung.controller.js";
const router = express.Router()

router.patch("/capnhat/yeuthich/:id",protectRoute,yeuThich);
router.put("/capnhat/thongtinGiaoHang",protectRoute,updateThongTinGiaoHang);

export default router