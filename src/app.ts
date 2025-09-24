import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
import { errorHandler } from "./middlewares/globalErrorHandler";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);
app.get("/", (req, res) => res.send("Person Manager API running..."));
app.use(errorHandler);

// ❌ Do not export the app directly
// ✅ Export a function for Vercel serverless
export default (req: any, res: any) => {
  app(req, res);
};
