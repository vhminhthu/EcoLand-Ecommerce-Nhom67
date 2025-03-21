import express from "express"
import { createAdmin, getMeAdmin, loginAdmin, logoutAdmin } from "../controllers/admin.controller.js"
import { protectAdmin } from "../middleware/protectAdmin.js"
const router = express.Router()


router.post("/login",loginAdmin)
router.get("/getme",protectAdmin,getMeAdmin)
router.post("/create-admin", createAdmin);
router.post("/logout", logoutAdmin);

export default router