const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const routes = require("./routes/Route");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Define API routes
app.use("/api", routes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../FoodysParadise - FrontEnd/build")));

  // Fallback to React's index.html for unknown routes
  app.use((req, res, next) => {
    if (!req.originalUrl.startsWith('/api')) {
        res.sendFile(path.resolve(__dirname, "../FoodysParadise - FrontEnd/build", "index.html"));
    } else {
        next();
    }
  });
}

// Start the server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));