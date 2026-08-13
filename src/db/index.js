import mongoose from "mongoose";

const connectDB = async (MONGO_URI) => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
