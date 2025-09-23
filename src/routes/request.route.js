import express from "express"
import { reviewRequest, sendRequest } from "../controllers/request.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const requestRoutes = express.Router()


requestRoutes.post("/send/:status/:userId", authMiddleware, sendRequest)

requestRoutes.post("/review/:status/:requestId",authMiddleware,reviewRequest)



export default requestRoutes