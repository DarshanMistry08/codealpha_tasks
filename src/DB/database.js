import mongoose from "mongoose";
import config from "../config/config.js";
import dotenv from 'dotenv'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${config.MONGO_URI}`)
        console.log(`MongoDB connected !!`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB