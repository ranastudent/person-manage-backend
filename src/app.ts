import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
import { errorHandler } from "./middlewares/globalErrorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("🚀 Person Manager API running...");
});

// Global error handler
app.use(errorHandler);

export default app;
