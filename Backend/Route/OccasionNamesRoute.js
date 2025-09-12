const express = require("express");
const router = express.Router();
const { getOccasionByGender } = require("../Controller/OccasionNames");

router.get("/:gender/occasion", getOccasionByGender);

module.exports = router;
