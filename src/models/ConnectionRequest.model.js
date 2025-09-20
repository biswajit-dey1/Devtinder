import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type: mongoose.Types.ObjectId,
        required:true
    },

    toUserId: {
        type: mongoose.Types.ObjectId,
        required:true
    },

    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored", "interested", "accepeted", "rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
})

    
    connectionRequestSchema.pre('save', function(next){
      
        const connectionRequest = this

        if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
            throw new Error("Cannot send connection request to yourself!")
        }

        next()
    })
   const ConnectionRequest = new mongoose.model('ConnectionRequest',connectionRequestSchema)

   export default ConnectionRequest