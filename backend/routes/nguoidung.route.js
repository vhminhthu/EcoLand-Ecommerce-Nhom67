import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { yeuThich } from "../controllers/nguoidung.controller.js";
const router = express.Router()

router.patch("/capnhat/yeuthich/:id",protectRoute,yeuThich);

export default router