const express = require("express");
const connectDB = require("./db/db");
const authRouter = require("./routers/auth.router");
const taskRouter = require("./routers/task.router");
require("dotenv").config();
const taskReminder = require("./cron/taskReminder");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
