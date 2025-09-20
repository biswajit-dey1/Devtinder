import { json } from "express"
import ConnectionRequest from "../models/ConnectionRequest.model.js"
import User from "../models/User.model.js"


const sendRequest = async (req, res) => {

    try {
        const { status, userId } = req.params

        if (!status || !userId) {
            throw new Error("Missing required parameters: status and userId")
        }

        const fromUserId = req.user._id

        const allowedStatus = ["interested", "ignored"]

        if (!allowedStatus.includes(status)) {

            return res.status(404)
                .json({
                    message: "Invalid status type: " + status,
                    succes: false
                })
        }


        const user = await User.findById(userId)

        if (!user) {
            throw new Error("User not found")
        }

        const existingConnection = await ConnectionRequest.findOne({
            $or: [{
                fromUserId,
                toUserId: userId
            }, {
                fromUserId: userId,
                toUserId: fromUserId
            }]
        })


        if (existingConnection) {
            return res.status(400)
                .json({
                    message: "Connection Request Already Exists!!",
                    succes: false
                })
        }

        const connectionRequest = await ConnectionRequest.create({
            fromUserId,
            toUserId: userId,
            status
        })



        res.status(201)
            .json({
                message: `Connection ${status}  succesfully`,
                succes: true,
                data: connectionRequest
            })

    } catch (error) {

        res.status(404)
            .json({
                message: error.message,
                succes: false
            })
    }
}

export { sendRequest }