import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { themDonHang } from "../controllers/donhang.controller.js"
const router = express.Router()

router.post("/them",protectRoute, themDonHang)

export default router