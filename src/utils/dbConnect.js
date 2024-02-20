import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(MONGO_URL);
};

export default dbConnect;
