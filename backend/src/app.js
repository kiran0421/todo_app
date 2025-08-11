import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import { initDB } from "./DB/dbConnect.js"; // pool export
import authRoutes from "./routes/authRoutes.js";
import { ensureTablesExist } from "./DB/dbSetup.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Welcome to the Todo API");
});

const PORT = process.env.PORT || 5000;

// Start server (pool auto-handles connection)
const startServer = async () => {
  try {
    (async () => {
      await initDB();
      await ensureTablesExist();
      app.listen(PORT || 3000, () => {
        console.log(`🚀 Server running on port ${PORT || 3000}`);
      });
    })();
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
};

startServer();

export default app;
