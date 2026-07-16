import mongoose from "mongoose";


const OtpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User is required"]
    },
    OtpHash:{
        type:String,
        required:[true,"otp is required"]
    }
},{timeseries:true}
)

const OtpsModel = mongoose.model("OtpsModel",OtpSchema)

export default OtpsModel