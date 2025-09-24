import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
import { userModel } from "./module/auth/auth.model";
import bcrypt from "bcrypt";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const existingAdmin = await userModel.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10);
    await userModel.create({
      name: "Rana",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin user seeded");
  }
};

// Connect DB → then start server
connectDB(MONGO_URI).then(async () => {
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
