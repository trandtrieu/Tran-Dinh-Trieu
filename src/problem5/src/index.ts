import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import resourceRoutes from "./routes/resource.routes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/resources", resourceRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
});
