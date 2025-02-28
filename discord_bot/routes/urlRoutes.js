import express from "express";
import {
  shortenUrl,
  redirectToUrl,
  listUrls,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/urls/list", listUrls);
router.get("/:id", redirectToUrl);

export default router;
