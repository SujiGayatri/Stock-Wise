const express = require("express");
const router = express.Router();
const { getSuggestions, getAllOutfits,matchOutfit } = require("../Controller/StyleController");

router.post("/suggest", getSuggestions);    
router.get("/outfits", getAllOutfits);       
router.post("/match-outfit",matchOutfit);

module.exports = router;
  