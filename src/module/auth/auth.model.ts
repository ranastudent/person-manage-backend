import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./auth.interface";

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<IUserDocument>("user", userSchema)
