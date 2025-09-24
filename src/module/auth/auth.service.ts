import { IUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { userModel } from "./auth.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

//register
export const registerUser = async (userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new userModel({
    ...userData,
    password: hashedPassword,
  });

  return user.save();
};

//login
export const loginUser = async (email: string, password: string) => {
  
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },

    process.env.JWT_SECRET as string,

    { expiresIn: "3h" }
  );
  return { user, token };
};
