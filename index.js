import express from "express"
import connectDb from "./src/utility/db.js"
import dotenv from "dotenv"
import authRoutes from "./src/routes/auth.route.js"
import cookieParser from "cookie-parser"
import profilerouter from "./src/routes/profile.route.js"

dotenv.config()
const app = express()

const port = 3000

app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/user",authRoutes)

app.use("/api/v1/profile", profilerouter)

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

