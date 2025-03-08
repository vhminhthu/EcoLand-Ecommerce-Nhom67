import express from "express"
import { addCuaHang, getCuaHangById } from "../controllers/cuahang.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/them", protectRoute, addCuaHang)
router.get("/lay/:id", getCuaHangById)
export default router