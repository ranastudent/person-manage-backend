import app from "../src/app";
import { connectDB } from "../src/config/db";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

(async () => {
  await connectDB(MONGO_URI);
})();

export default app;
