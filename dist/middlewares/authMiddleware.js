"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No Token Provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Token Missing" });
    }
    try {
        // console.log("🔑 Using JWT_SECRET:", JWT_SECRET);  // check env is loaded
        // console.log("📌 Token received:", token);
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // console.log("✅ Decoded token:", decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("❌ JWT Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Forbidden access denied" });
        }
        next();
    };
};
exports.authorize = authorize;
