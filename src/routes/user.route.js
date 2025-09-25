import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { connections, feed, receivedRequest } from "../controllers/user.controller.js"

const userRoutes = express.Router()

userRoutes.get("/requests/received", authMiddleware, receivedRequest)
userRoutes.get("/connections", authMiddleware, connections)
userRoutes.get("/feed", authMiddleware, feed)

export default userRoutes