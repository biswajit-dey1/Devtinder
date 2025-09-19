import express from "express"
import { getProfile, updateProfile } from "../controllers/profile.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"


const profileRoutes = express.Router()


profileRoutes.get("/view-profile",authMiddleware,getProfile)
profileRoutes.post("/update-profile",authMiddleware,updateProfile)

export default profileRoutes