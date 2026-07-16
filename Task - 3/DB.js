import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {

    });
    console.log("DB connected");
    // console.log(mongoose.connection.name);
    
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

export default ConnectDB;  
