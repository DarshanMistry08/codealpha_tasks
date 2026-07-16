import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: Number,
            unique: true,
        },

        capacity: {
            type: Number,
            required: true,
            min: 1,
        },

        status: {
            type: String,
            enum: ["available", "occupied", "reserved", "maintenance"],
            default: "available",
        },

        location: {
            type: String,
            enum: ["indoor", "outdoor", "vip"],
            default: "indoor",
        },
        currentReservation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservation",
            default: null,
        },
        currentOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// tableSchema.pre("save", async function (next) {

//     // if (!this.isNew) {
//     //     return next();
//     // }

//     const lastTable = await this.constructor
//         .findOne()
//         .sort({ tableNumber: -1 });

//     this.tableNumber = lastTable ? lastTable.tableNumber + 1 : 1;

//     // next();
// });

tableSchema.pre("save", async function () {
    if (!this.isNew) return;

    const lastTable = await this.constructor
        .findOne()
        .sort({ tableNumber: -1 });

    this.tableNumber = lastTable ? lastTable.tableNumber + 1 : 1;
});

const Table = mongoose.model("Table", tableSchema);

export default Table