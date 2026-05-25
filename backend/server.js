import express from "express";
import cors from "cors";

const app = express();

// allow frontend to talk to backend
app.use(cors());

// simple test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// start server on port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});