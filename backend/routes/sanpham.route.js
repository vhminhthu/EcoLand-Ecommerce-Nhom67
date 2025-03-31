import express from "express"
import  { updateProduct,addSanPham, capNhatLuotXem, getSanPhamById, getSanPhamByIdCH, getSanPhamByIdDM, getTatCaSanPham, getTatCaSanPhamDM, goiYTimKiem, laySanPhamvoiIdCuaHang, timKiem, getPendingProduct, deleteProduct, getProductInfo, getProductsByCategory, getTopDeal, getTopSelling, getProductSuggestions, getProducTrelated, duyetSanPham } from "../controllers/sanpham.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
import { protectAdmin } from "../middleware/protectAdmin.js"
const router = express.Router()

router.post("/them", protectRoute, addSanPham)
router.get("/lay/tatca", getTatCaSanPham)
router.get("/lay/tatca/danhmuc", getTatCaSanPhamDM)

router.get("/lay/theocuahang",protectRoute, laySanPhamvoiIdCuaHang)

router.get("/lay/:id",protectRoute, getSanPhamById)
router.get("/laytheocuahang/:id",protectRoute, getSanPhamByIdCH)

router.get("/search/goiy",goiYTimKiem)

router.put("/capnhat/luotxem/:id",capNhatLuotXem)
router.get("/search/timkiem",timKiem)

//router.get("/lay/danhmuc",getSanPhamByIdDM)
router.get("/lay/danhmuc/sp",getSanPhamByIdDM)
router.get("/lay/cuahang/sp", getSanPhamByIdCH)

router.patch("/sua/:id", updateProduct);

router.get("/get/pending", getPendingProduct);
// router.get("/get/:certifierAddress", getPendingProductFromCertifier);
// router.patch("/certify/:productId", duyetSanPhamTrenBlockChain);
router.patch("/update-status/:productId",protectAdmin, duyetSanPham);

router.delete("/delete/:id", deleteProduct);

router.get("/lay/serial/:id", getProductInfo)
router.get("/get/category/:id", getProductsByCategory)

router.get("/top-deal",getTopDeal)
router.get("/top-selling", getTopSelling)
router.get("/suggestions", getProductSuggestions)
router.get("/trelated/:idCH", getProducTrelated)

export default router