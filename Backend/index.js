process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;
const MONGO_URI = process.env.MONGO_URI;

process.on('uncaughtException', err => { console.error('Uncaught:', err); process.exit(1); });
process.on('unhandledRejection', err => { console.error('Unhandled:', err); process.exit(1); });

if (isNaN(PORT) || PORT < 1024) {
  console.error('Invalid PORT value:', process.env.PORT);
  process.exit(1);
}

// ===== Middleware =====
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/images", express.static("Images"));

// ===== Routes (import only once) =====
try { app.use("/api", require("./Route/Suggest")); } catch (err) { console.error('Suggest route error:', err); }
try { app.use("/api", require("./Route/OccasionRoute")); } catch (err) { console.error('Occasion route error:', err); }
try { app.use("/api", require("./Route/CategoryNamesRoute")); } catch (err) { console.error('CategoryNames route error:', err); }
try { app.use("/api", require("./Route/SeasonRoute")); } catch (err) { console.error('Season route error:', err); }
try { app.use("/api", require("./Route/OccasionNamesRoute")); } catch (err) { console.error('OccasionNames route error:', err); }
try { app.use("/api/auth", require("./Route/auth")); } catch (err) { console.error('Auth route error:', err); }

// ===== MongoDB + Server Startup =====
mongoose.connect(MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB:", mongoose.connection.name);

  const server = app.listen(PORT, '0.0.0.0', () => {
    const addr = server.address();
    console.log(`Server running on ${addr.address}:${addr.port} (${addr.family})`);
  });

  // 404 handler
  app.use((req, res) => {
    console.log("404 Not Found:", req.method, req.url);
    res.status(404).send("Route not found");
  });

})
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // exit if DB fails
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
