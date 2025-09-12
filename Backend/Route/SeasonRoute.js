const express = require("express");
const router = express.Router();
const { getOutfitsBySeason } = require("../Controller/SeasonController");

router.post("/season", getOutfitsBySeason);

module.exports = router;
