import mongoose from "mongoose";
import { readFileSync } from "fs";
import path from "path";

const connectMongoDB = async (MONGO_URI) => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

let dbBuffer = null;

const mmdbBuffer = () => {
  if (!dbBuffer) {
    dbBuffer = readFileSync(path.join(path.resolve(), "src/data/ip66.mmdb"));
  }
  return dbBuffer;
};

export { connectMongoDB, mmdbBuffer };
