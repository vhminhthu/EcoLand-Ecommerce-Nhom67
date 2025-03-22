import express from "express"
import { getAllProduct, getCertifier, getInspector, getStore } from "../controllers/blockchain.controller.js"

const router = express.Router()


router.get("/certifier", getCertifier)
router.get("/inspector", getInspector)
router.get("/store", getStore)
router.get("/all/product", getAllProduct)


export default router