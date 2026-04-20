import jwt from "jsonwebtoken"
import User from "../models/User.model.js"

const authMiddleware = async (req,res,next) =>{
   
try {
     const token = req.cookies.token
  
     if(!token){
       throw new Error("Token expired or not valid, Login again")
     }
  
     const secret = process.env.JWT_SECRET
     if (!secret) {
       throw new Error("JWT_SECRET is not configured")
     }

     const decodedToken = jwt.verify(token, secret, {
       algorithms: ["HS256"]
     })
  
     const {_id} = decodedToken
  
    const user = await User.findById(_id).select(
      "-password"
    )

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      })
    }
  
    req.user = user
  
    next()
} catch (error) {
   res
     .status(404)
     .json({
      message:error.message
     })
}
}

export default authMiddleware