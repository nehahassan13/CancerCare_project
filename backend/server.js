const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const patientRoutes = require("./routes/patientRoute");
const doctorRoutes = require("./routes/doctorRoute");
const treatmentRoutes = require("./routes/treatmentRoute");
const symptomRoutes = require("./routes/symptomRoute");
const authRoutes = require("./routes/authRoute");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection with better error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(" MongoDB Connected Successfully");
  console.log(` Database: ${mongoose.connection.db.databaseName}`);
  console.log(`Host: ${mongoose.connection.host}`);
})
.catch(err => {
  console.error(" MongoDB Connection Error:", err.message);
  console.error(" Full Error:", err);
});

// Event listeners for MongoDB connection
mongoose.connection.on("connected", () => {
  console.log(" Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error(" Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log(" Mongoose disconnected from DB");
});

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "CancerCare Backend Running", 
    status: "active",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };
  
  res.json({
    status: "OK",
    database: statusMap[dbStatus] || "unknown",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(" Server Error:", error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    status: error.status || 500,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server Running on Port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(` Started at: ${new Date().toLocaleString()}`);
});