import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import db from "./DB/dbConnect.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes); // Assuming you have auth routes
// API Routes
app.use("/api/todos", todoRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Welcome to the Todo API");
});

// Start server only if DB is connected
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
};

startServer();

export default app;
