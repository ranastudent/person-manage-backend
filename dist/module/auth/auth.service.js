"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_model_1 = require("./auth.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
//register
const registerUser = async (userData) => {
    const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
    const user = new auth_model_1.userModel({
        ...userData,
        password: hashedPassword,
    });
    return user.save();
};
exports.registerUser = registerUser;
//login
const loginUser = async (email, password) => {
    const user = await auth_model_1.userModel.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id,
        role: user.role,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: "3h" });
    return { user, token };
};
exports.loginUser = loginUser;
