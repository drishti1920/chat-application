import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectToMongoDB = async (req,res)=>{
   try{
await mongoose.connect(process.env.MONGODB_URI)
console.log("Connected to MongoDB")

   }catch(err)
   {
    console.log("Error connecting to MongoDB:", err.message)
   } 
}

export default connectToMongoDB;