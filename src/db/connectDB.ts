import mongoose from "mongoose";

export default async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('Database connected');
    }
    catch(err){
        console.log("DB connection error : ",err);
    }
}