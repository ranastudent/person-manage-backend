import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;


export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
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

    const decoded = jwt.verify(token, JWT_SECRET as string);
    // console.log("✅ Decoded token:", decoded);

    req.user = decoded;
    next();
  } catch (error: any) {
    console.error("❌ JWT Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};


export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden access denied" });
    }
    next();
  };
};
