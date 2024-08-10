const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path"); // Import path module

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

// Define a test route to check server status
app.get("/", (req, res) => {
  res.send("Foodys Paradise Backend");
});

app.use("/api", routes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../FoodysParadise - FrontEnd/build")));

  // For any request that doesn't match a specific route, serve index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../FoodysParadise - FrontEnd/build", "index.html"));
  }); 
}

app.listen(PORT, () => console.log(`Listening at ${PORT}`));