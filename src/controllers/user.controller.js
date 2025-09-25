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

const connections = async (req, res) => {
     
    try {

        const loggedInUser = req.user

   const rowConnection =  await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,
                 status:"accepted"
                },
                {fromUserId:loggedInUser._id,
                status:"accepted"
                }
            ]
          }).populate("toUserId","firstName lastName photoUrl about age")
            .populate("fromUserId", "firstName lastName photoUrl about age")

            
      

         const connections =  rowConnection.map((row) => {
              if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                  return row.toUserId
              }

              return row.fromUserId
            })

            
            res.status(202)
              .json({
                message:"Connection fetched succesfully",
                noOfConnection:connections.length,
                connection: connections
              })
        
    } catch (error) {
        
        res.status(404)
         .json({
            message:error.message
         })
    }
}

export {receivedRequest,connections}