import app from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

let isConnected = false;

// ensure MongoDB is connected only once (important for Vercel serverless)
const ensureDB = async () => {
  if (!isConnected) {
    await connectDB(MONGO_URI);
    isConnected = true;
  }
};

export default async function handler(req: any, res: any) {
  await ensureDB();
  return app(req, res); // let Express handle the request
}
