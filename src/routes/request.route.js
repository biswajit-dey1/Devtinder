import express from "express"
import { sendRequest } from "../controllers/request.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const requestRoutes = express.Router()


requestRoutes.post("/send/:status/:userId", authMiddleware, sendRequest)


export default requestRoutes