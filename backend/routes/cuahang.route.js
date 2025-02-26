import express from "express"
import { addCuaHang } from "../controllers/cuahang.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/them", protectRoute, addCuaHang)

export default router