import mongoose from "mongoose";

 export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/quickgpt`);
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error.message)
    }
};
