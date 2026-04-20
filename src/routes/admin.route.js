import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import authorize from "../middlewares/authorize.js"
import { getAllUsers, updateUserRole } from "../controllers/admin.controller.js"

const adminRoutes = express.Router()

adminRoutes.get("/users", authMiddleware, authorize("admin"), getAllUsers)
adminRoutes.patch("/users/:userId/role", authMiddleware, authorize("admin"), updateUserRole)

export default adminRoutes
