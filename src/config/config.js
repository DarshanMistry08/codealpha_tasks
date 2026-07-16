import dotenv from 'dotenv';
import { ApiError } from '../../utils/ApiError.js';
dotenv.config();

if(!process.env.MONGO_URI){
    throw new ApiError(301,"MONGO_URI is not present in .env")
}
if(!process.env.JWT_SECRET){
    throw new ApiError(301,"JWT_SECRET is not present in .env")
}

if(!(process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_USER)){
    throw new ApiError(301,"Somthing Googles .env is not present in .env")
}



const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN:process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER:process.env.GOOGLE_USER,
};


export default config;