import express from "express";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", userRoutes);

connect();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
