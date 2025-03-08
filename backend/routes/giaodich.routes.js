import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { getGiaoDichById, themGiaoDich } from "../controllers/giaodich.controller.js"
const router = express.Router()

router.post("/them", themGiaoDich)
router.get("/lay/:id", getGiaoDichById)

export default router