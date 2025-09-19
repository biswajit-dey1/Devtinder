
const getProfile = (req,res) =>{

   try {
     const loggedInUser = req.user

     if(!loggedInUser){
        throw new Error("User not found")
     }
 
     res.
        status(200)
        .json({
         message:"Profile fetched Succesfully",
         data:loggedInUser
        })
        
   } catch (error) {
      
     res.
         status(404)
         .json({
            message:error.message
         })
   }

}

export {getProfile}