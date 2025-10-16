import express from "express";
import cors from "cors";
import morgan from "morgan";
import uploadRoutes from "./routes/uploadRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

// Dynamic CORS setup
const allowedOrigins = [
  "http://localhost:5173", 
  "https://credit-sea-assignment-rajesh.vercel.app", 
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS ❌"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

//  Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/reports", reportRoutes);

//  Health check route
app.get("/", (req, res) => {
  res.status(200).send("🚀 Backend Working Fine!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  if (err.message.includes("CORS")) {
    res.status(403).json({ error: "CORS Policy Blocked This Request" });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
