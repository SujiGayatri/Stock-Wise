const Outfit = require("../Model/StyleModel");

const getOutfitsBySeason = async (req, res) => {
  const { season } = req.body;
  try {
    const outfits = await Outfit.find({
      Season: { $regex: new RegExp(season, "i") },
    }).select("Name Image Occasion Category");

    res.status(200).json(outfits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch outfits by season" });
  }
};

module.exports = { getOutfitsBySeason };
