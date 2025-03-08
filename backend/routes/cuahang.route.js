import express from "express"
import { addCuaHang, getAllCuaHang, getCuaHangById } from "../controllers/cuahang.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/them", protectRoute, addCuaHang)
router.get("/lay/:id", getCuaHangById)

router.get("/laytatca", getAllCuaHang)

export default router