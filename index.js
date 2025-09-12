import express from "express"
import userRoutes from "./src/routes/user.route.js"
import connectDb from "./src/utility/db.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()

const port = 3000



app.use("/api/v1/user",userRoutes)

connectDb()
.then(() =>{
    console.log("Database connection established...")

    app.listen(3000,() =>{
    console.log(`Sever is listening in port ${port}`)
})

})
.catch((err) =>{
  console.log("Error in connecting in database", err);
  
})

