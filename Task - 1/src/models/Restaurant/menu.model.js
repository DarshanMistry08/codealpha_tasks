import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: [true, "Food name must be required"],
            trim: true,
            // lowercase: true,

        },
        description: {
            type: String,
            required: true,
            trim: true,

        },
        price: {
            type: Number,
            required: [true, "price to add karvi pade bhaiii"],
            min: 0
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Starter", "Main Course", "Dessert", "Beverage", "Pizza", "Burger",
            ],
        },
        foodImg: {
            type: String,
            default: ""
        },
        available: {
            type: Boolean
        },
        preparationTime: {
            type: Number,
            default: 15,
        },
        rating: {
            type: Number,
            default: 3,
            min: 0,
            max: 5,
        },

        isSpecial: {
            type: Boolean,
            default: false,
        },

        isBestSeller: {
            type: Boolean,
            default: false,
        },

        isRecommended: {
            type: Boolean,
            default: false,
        },

        isNew: {
            type: Boolean,
            default: false,
        },
        addOns: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                price: {
                    type: Number,
                    default: 0,
                },
                available: {
                    type: Boolean,
                    default: true,
                },
            },
        ],

    }, { timestamps: true }
)


const Menu = mongoose.model("Menu", menuSchema)

export default Menu;