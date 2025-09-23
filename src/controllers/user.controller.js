import ConnectionRequest from "../models/ConnectionRequest.model.js"

const receivedRequest = async (req,res) => {

    try {

        const loggedInUser = req.user

     const  allRequest = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName photoUrl about age")

       const pendingRequest = allRequest.map(request => request.fromUserId)

       if(pendingRequest.length < 1){
         res.status(200)
            .json({
                message:"You have no pending request",
                success:true,
                pendingRequest

            })
       }

        res.status(202)
            .json({
                message:"Pending connection requests retrieved successfully",
                success:true,
                totalPendingRequest:pendingRequest.length,
                pendingRequest:pendingRequest
            })
      
    

     
        
    } catch (error) {
         res.status(501)
         .json({
            message:error.message
         }) 
    }

}

export {receivedRequest}