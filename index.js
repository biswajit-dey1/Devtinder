import express from "express"
import connectDb from "./src/utility/db.js"
import dotenv from "dotenv"
import authRoutes from "./src/routes/auth.route.js"

dotenv.config()
const app = express()

const port = 3000

app.use(express.json())


app.use("/api/v1/user",authRoutes)

connectDb()
.then(() =>{
    console.log("Database connection established...")

    app.listen(3000,() =>{
    console.log(`Server is listening in port ${port}`)
})

})
.catch((err) =>{
  console.log("Error in connecting in database", err);
  
})

