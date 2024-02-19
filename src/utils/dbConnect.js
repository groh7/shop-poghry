import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://dostep:dostep@cluster0.xhl2rut.mongodb.net/shop";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(MONGO_URL);
};

export default dbConnect;
