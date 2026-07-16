import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            // default:"Pending"
        },
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Menu"
                },

                quantity: Number,

                price: Number,

                addOns: [
                    {
                        addOn: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "AddOn"
                        },

                        name: String,

                        price: Number,
                    }
                ]
            }
        ],
        orderStatus: {
            type: String,
            required: true,
            default: "Pending",
            enum: ["Pending", "Preparing", "Ready", "Served", "Completed", "Cancelled"]
        },
        orderNumber: {
            type: Number,
            unique: true,
        },
        orderType: {
            type: String,
            enum: ["Dine-In", "Takeaway", "Delivery"],
            default: "Dine-In"
        },

        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table"
        },
        totalOrder: {
            type: Number,
            default: 0
        },

    }, { timestamps: true }

)

orderSchema.pre("save", async function () {
    if (!this.isNew) return;

    const lastOrder = await this.constructor
        .findOne()
        .sort({ orderNumber: -1 })

    this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

})

const Order = mongoose.model("Order", orderSchema)

export default Order 
