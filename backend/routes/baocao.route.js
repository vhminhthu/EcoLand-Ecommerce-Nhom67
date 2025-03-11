import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { addBaoCao } from "../controllers/baocao.controller.js"
const router = express.Router()

router.post("/them/:id", protectRoute, addBaoCao)

export default router