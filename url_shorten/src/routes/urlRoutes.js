const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  redirectToUrl,
  listUrls,
  displayUI,
} = require("../controllers/urlController");

router.post("/shorten", shortenUrl);
router.get("/urls/list", listUrls);
router.get("/url/:id", redirectToUrl);
router.get("/test", displayUI);

module.exports = router;
