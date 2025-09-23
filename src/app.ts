import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/globalErrorHandler";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Person Manager API is running...");
});

app.use(errorHandler)

export default app;
