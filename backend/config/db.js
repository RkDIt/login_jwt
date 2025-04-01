import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {}).then((conn)=>{
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }).catch((e)=>{
      console.log(`MongoDB connection failed:`,e);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
