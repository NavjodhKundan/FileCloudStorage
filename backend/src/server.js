import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import healthRouter from "./routes/health.routes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173"
}));

//middleware
app.use(express.json());
app.use("/", healthRouter);

app.listen(PORT, () => console.log(`Backend is running at http://localhost:${PORT}`));