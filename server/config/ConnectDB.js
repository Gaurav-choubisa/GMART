
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "please provide mongodb_uri"
    ) 
}
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}
export default connectDB;
// This code connects to a MongoDB database using Mongoose.