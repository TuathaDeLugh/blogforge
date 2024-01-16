import mongoose from "mongoose";

export default async function connectdb() {
  const url = process.env.MONGO_URL;

  try {
    if (!url) {
      throw new Error("MONGO_URL not found in environment variables");
    }

    await mongoose.connect(url);
    console.log('Database connected')

  } catch (e : any) {
    console.error(e.message);
  }
}
  // 'mongodb+srv://umangsailor:admin@cloudforhosting.u9dgzyu.mongodb.net/BlogForge'