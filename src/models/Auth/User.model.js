import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true,"Username must be different"]
        },
        email: {
            type: String,
            required: [true, "email  is required"],
            unique: [true,"email must be different"]
        },
        password:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type:String,
            required:true
        },
        verified:{
            type:Boolean,
            default:false,
        }

    },{timestamps:true}
)

const User = mongoose.model("User", UserSchema)

export default User