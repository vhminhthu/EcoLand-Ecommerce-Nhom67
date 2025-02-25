import express from "express"
import {addDanhMuc, getDanhMuc} from '../controllers/danhmuc.controller.js'

const router = express.Router()

router.post("/them", addDanhMuc)
router.get("/lay", getDanhMuc)

export default router