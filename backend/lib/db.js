import mongoose from "mongoose";

async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo db connected:" + conn.connection.host);
  } catch (error) {
    console.error("error connecting to mongoDb", error.message);
    process.exit(1);
  }
}

export default connectDb;
