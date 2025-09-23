import express from "express";
import * as AuthController from "./auth.controller";

export const AuthRoute = express.Router();

AuthRoute.post("/register", AuthController.register);
AuthRoute.post("/login", AuthController.login);