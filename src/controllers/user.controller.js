import ConnectionRequest from "../models/ConnectionRequest.model.js"
import User from "../models/User.model.js"

const receivedRequest = async (req, res) => {

    try {

        const loggedInUser = req.user

        const allRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl about age")

        const pendingRequest = allRequest.map(request => request.fromUserId)

        if (pendingRequest.length < 1) {
            res.status(200)
                .json({
                    message: "You have no pending request",
                    success: true,
                    pendingRequest

                })
        }

        res.status(202)
            .json({
                message: "Pending connection requests retrieved successfully",
                success: true,
                totalPendingRequest: pendingRequest.length,
                pendingRequest: pendingRequest
            })





    } catch (error) {
        res.status(501)
            .json({
                message: error.message
            })
    }

}

const connections = async (req, res) => {

    try {

        const loggedInUser = req.user

        const rowConnection = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id,
                    status: "accepted"
                },
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted"
                }
            ]
        }).populate("toUserId", "firstName lastName photoUrl about age")
            .populate("fromUserId", "firstName lastName photoUrl about age")




        const connections = rowConnection.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }

            return row.fromUserId
        })


        res.status(202)
            .json({
                message: "Connection fetched succesfully",
                noOfConnection: connections.length,
                connection: connections
            })

    } catch (error) {

        res.status(404)
            .json({
                message: error.message
            })
    }
}


const feed = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1

        let limit = parseInt(req.query.limit) || 10

        limit = limit < 50 ? limit : 50

        const skip = (page - 1) * limit
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id },
            { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set()

        connectionRequest.forEach((row) => {

            hideUserFromFeed.add(row.fromUserId.toString())
            hideUserFromFeed.add(row.toUserId.toString())
        })

        const user = await User.find({
            $and: [{ _id: { $nin: Array.from(hideUserFromFeed) } },

            { _id: { $ne: loggedInUser._id } }
            ]
        }).select("-password -emailId -createdAt -updatedAt -__v")
            .skip(skip)
            .limit(limit)

        res.status(200)
            .json({
                message: "Feed fetched succesfully ",
                success: true,
                total: user.length,
                pageNumber:page,
                feed: user
            })
    } catch (error) {

        res.status(404)
            .json({
                message: error.message
            })
    }

}
export { receivedRequest, connections, feed }