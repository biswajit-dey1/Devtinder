import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { receivedRequest } from "../controllers/user.controller.js"

const userRoutes = express.Router()

userRoutes.get("/requests/received",authMiddleware, receivedRequest)

export default userRoutes