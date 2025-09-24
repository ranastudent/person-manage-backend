"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const auth_model_1 = require("./module/auth/auth.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const seedAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail)
        return;
    const existingAdmin = await auth_model_1.userModel.findOne({ email: adminEmail });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt_1.default.hash(process.env.ADMIN_PASSWORD, 10);
        await auth_model_1.userModel.create({
            name: "Rana",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
        });
        console.log("✅ Admin user seeded");
    }
};
// Connect DB → then start server
(0, db_1.connectDB)(MONGO_URI).then(async () => {
    await seedAdmin();
    app_1.default.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
});
