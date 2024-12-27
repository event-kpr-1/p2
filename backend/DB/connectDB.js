import mongoose from "mongoose";


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected ")
    } catch (err) {
        console.log("Error in connectDB : ",err.message)
        process.exit(1);
    }
}

export default connectDB;