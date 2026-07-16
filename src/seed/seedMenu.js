import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../DB/database.js";
import Menu from "../models/Restaurant/menu.model.js";
import { menuData } from "./menuData.js";
import AddOn from '../models/Restaurant/addOn.model.js'

dotenv.config();

const seedMenu = async () => {
    try {

        await connectDB();

        await Menu.deleteMany();

        await Menu.insertMany(menuData);

        await AddOn.create({
            name: "Extra double Cheese",
            price: 90,
            description: "Extra double cheese",
            isAvailable: true
        });

        console.log("✅ Menu seeded successfully");

        await mongoose.disconnect();

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding menu:", error);

        await mongoose.disconnect();

        process.exit(1);
    }
};

seedMenu();