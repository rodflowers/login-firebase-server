const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const router = require("./routes/auth");
const cors = require("cors");
// Load env vars
dotenv.config({ path: "./config.env" });

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", router);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message.red}`);
  // Close server & exit
  server.close(() => process.exit(1));
});
