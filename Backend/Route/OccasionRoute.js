const express = require("express");
const router = express.Router();
const { getOutfitsByOccasion } = require("../Controller/Occasion");

router.post("/occasion", getOutfitsByOccasion);

module.exports = router;