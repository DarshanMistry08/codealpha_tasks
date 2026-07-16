import mongoose from "mongoose";

const addOnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
        default: 0,
    },

    isAvailable: {
        type: Boolean,
        default: true,
    }
});

const AddOn = mongoose.model("AddOn",addOnSchema)

export default AddOn;