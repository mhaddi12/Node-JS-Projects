import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const urlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Url", urlSchema);
