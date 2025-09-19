import express from "express"
import { getProfile } from "../controllers/profile.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"


const profileRoutes = express.Router()


profileRoutes.get("/view-profile",authMiddleware,getProfile)

export default profileRoutes