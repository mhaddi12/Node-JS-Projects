const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const urlRoutes = require("./routes/urlRoutes");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Ensure form data parsing
//app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// ✅ Routes
app.use("/", urlRoutes);

app.listen(port, () => {
  console.log(`✅ URL Shortener service running at http://localhost:${port}`);
});
