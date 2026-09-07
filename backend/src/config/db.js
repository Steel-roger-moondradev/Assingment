import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
console.log("Environment variables initialized");

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Problem in database connection:", error.message);
    throw error;
  }
};
