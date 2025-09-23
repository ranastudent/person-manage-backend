import { NextFunction, Request, Response } from "express";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction ) =>{
  console.log("Error middleware: ", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "something went wrong"
  })
}