import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { connections, receivedRequest } from "../controllers/user.controller.js"

const userRoutes = express.Router()

userRoutes.get("/requests/received",authMiddleware, receivedRequest)
userRoutes.get("/connections",authMiddleware,connections)

export default userRoutes