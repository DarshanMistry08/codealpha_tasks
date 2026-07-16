import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
            required: true,
        },

        reservationDate: {
            type: Date,
            required: true,
        },

        reservationTime: {
            type: String,
            required: true,
        },
        
        numberOfGuests: {
            type: Number,
            required: true,
            min: 1,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

 const Reservation = mongoose.model("Reservation", reservationSchema);
 export default Reservation