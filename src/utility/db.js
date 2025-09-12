import mongoose from "mongoose";

const connectDb = async () =>{

  await mongoose.connect(process.env.MONGODB_URL + "devtinder")

}


export default connectDb