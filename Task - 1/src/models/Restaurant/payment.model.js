import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "Card", "Online"],
            required: true,
        },

        paymentId: {
            type: String,
            trim: true,
            default: null,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending",
        },

        receiptNumber: {
            type: String,
            unique: true,
            trim: true,
        },

        refundAmount: {
            type: Number,
            default: 0,
        },

        refundReason: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;