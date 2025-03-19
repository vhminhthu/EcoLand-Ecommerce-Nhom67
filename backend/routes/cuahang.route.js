import express from "express"
import { addCuaHang, duyetCuaHang, getAllCuaHang, getCuaHangById } from "../controllers/cuahang.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
import { protectAdmin } from "../middleware/protectAdmin.js"
const router = express.Router()

router.post("/them", protectRoute, addCuaHang)
router.get("/lay/:id", getCuaHangById)
router.patch("/update-status/:idCuaHang",protectAdmin, duyetCuaHang);

router.get("/laytatca", getAllCuaHang)

export default router