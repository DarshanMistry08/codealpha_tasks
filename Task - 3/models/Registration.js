import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
    {
        personalInfo: {
            name: {
                type: String
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            number: {
                type: Number,
                required: true,
                unique: true,
            },
            age: {
                type: Number,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
        },

        collegeInfo: {
            education: {
                type: String,
                required: true,
            },
            college: {
                type: String,
                required: true,
            },
            semester: {
                type: Number,
                required: true,
            },
            post: {
                type: String,
                required: true,
            },
        },

        eventInfo: {
            event: {
                type: String,
                required: true,
            },
            date_of_birth: {
                type: Date,
                required: true,
            },
            role: {
                type: String,
                required: true,
            },
        }



    }, { timestamps: true })

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;

