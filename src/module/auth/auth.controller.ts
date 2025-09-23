import { Request, Response } from "express";
import * as AuthService from "./auth.service";


export const register = async (req: Request, res: Response) => {
      try {

            const user = await AuthService.registerUser(req.body); 
            res.status(201).json({success: true, data: user});     
            
      } catch (error: any) {
            res.status(400).json({success: false, message: error.message});
      }
};

export const login = async (req: Request, res: Response)=>{
      try {
            const {email, password} = req.body;
            const {user, token} = await AuthService.loginUser(email, password);
            res.status(200).json({success: true, data: {user, token}});
      } catch (error: any) {
            res.status(400).json({success: false, message: error.message});
      }
}