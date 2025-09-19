import express from "express"
import { login, logout, signUp } from "../controllers/auth.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"


const authRoutes = express.Router()

authRoutes.post("/signup",signUp )
authRoutes.post("/login",login)
authRoutes.post("/logout",authMiddleware,logout)

export default authRoutes