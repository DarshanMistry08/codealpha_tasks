import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:[true,"User is required"]
        },
        RefreshTokenHash:{
        type:String,
        required:[true,"refresh token hash is required"]
        },
        ip:{
            type:String,
            required:[true,"IP address is required"]
        },
        userAgent:{
            type:String,
            required:[true,"USer agent is required"]
        },
        revoke:{
            type:Boolean,
            default:false
        }
    },{ timestamps: true }

)

const Session = mongoose.model("Session",sessionSchema)

export default Session