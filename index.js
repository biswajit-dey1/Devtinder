import express from "express"
import userRoutes from "./src/routes/user.route.js"


const app = express()

const port = 3000



app.use("/api/v1/user",userRoutes)

app.listen(3000,() =>{
    console.log(`Sever is listening in port ${port}`)
})