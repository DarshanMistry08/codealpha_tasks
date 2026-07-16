import User from "../models/Auth/User.model.js";
import config from "../config/config.js";
import {ApiError} from "../../utils/ApiError.js";
import {asyncHandler} from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async (req,res,next)=>{
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization")?.replace(/^Bearer\s+/i, "")

        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }

       const decodedToken = jwt.verify(token,config.JWT_SECRET)

        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "Invalid access token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})