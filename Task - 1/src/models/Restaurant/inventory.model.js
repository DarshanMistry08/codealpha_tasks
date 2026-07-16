import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        category: {
            type: String,
            enum: [
                "Vegetable",
                "Fruit",
                "Meat",
                "Seafood",
                "Dairy",
                "Grains",
                "Spices",
                "Beverages",
                "Frozen",
                "Packaging",
                "Other",
            ],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        unit: {
            type: String,
            enum: [
                "kg",
                "g",
                "liter",
                "ml",
                "piece",
                "packet",
                "box",
                "dozen",
            ],
            required: true,
        },

        minimumStock: {
            type: Number,
            required: true,
            min: 0,
        },

        costPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            default: null,
        },

        expiryDate: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: ["In Stock", "Low Stock", "Out of Stock"],
            default: "In Stock",
        },

        location: {
            type: String,
            trim: true,
            default: "Main Store",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 500,
        },
    },
    {
        timestamps: true,
    }
);

inventorySchema.pre("save", function (next) {
    if (this.quantity === 0) {
        this.status = "Out of Stock";
    } else if (this.quantity <= this.minimumStock) {
        this.status = "Low Stock";
    } else {
        this.status = "In Stock";
    }

    next();
});

inventorySchema.virtual("isExpired").get(function () {
    return this.expiryDate && this.expiryDate < new Date();
});

inventorySchema.index({ name: 1 });
inventorySchema.index({ status: 1 });
inventorySchema.index({ category: 1 });

export const Inventory = mongoose.model("Inventory", inventorySchema);