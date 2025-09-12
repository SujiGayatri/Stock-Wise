const Outfit = require("../Model/StyleModel");

exports.getOutfitsByOccasion = async (req, res) => {
  const { occasion,category } = req.body;

  try {
    const matched = await Outfit.find({
      Occasion: { $regex: new RegExp(occasion, "i") },
      Category: category,
    });

    console.log("Matched items:", matched.length);
    res.status(200).json(matched);
  } catch (err) {
    console.error("Occasion filter failed:", err);
    res.status(500).json({ error: "Occasion filter failed" });
  }
};
