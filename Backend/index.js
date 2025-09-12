const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", require("./Route/auth"));
const mongoose = require('mongoose');
const suggest = require("./Route/Suggest");
const occasion = require("./Route/OccasionRoute");
const categoryRoutes = require("./Route/CategoryNamesRoute");
const occasionRoutes = require("./Route/OccasionNamesRoute");
const seasonRoute = require("./Route/SeasonRoute");
const authRoutes = require("./Route/auth");
app.use("/images", express.static("Images"));

const MONGO_URI = 'mongodb+srv://saridelavanyarajeswari:Jf3YO2V1mkc0OAfv@cluster0.yqf6pxf.mongodb.net/ProductData?retryWrites=true&w=majority';

app.use(express.json());
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  const db = mongoose.connection;
  console.log('Connected to MongoDB');
  
  console.log('Database:', db.name);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use("/api", suggest);
app.use("/api", occasion);
app.use("/api", categoryRoutes);
app.use("/api", seasonRoute);
app.use("/api", occasionRoutes);
app.use("/api/auth", authRoutes);


app.use((req, res) => {
  console.log("404 Not Found:", req.method, req.url);
  res.status(404).send("Route not found");
});

