const Outfit = require("../Model/StyleModel");

const weights = {
  Name: 2,
  Type: 3,
  Color: 2,
  Style: 2,
  Occasion: 3, 
  Fabric: 1,
  Size: 1,
  Fit: 2,
  Price: 1,
  Season: 2,
  Category: 2,
};

exports.getSuggestions = async (req, res) => {
  const prompt = req.body.prompt?.toLowerCase() || "";

  try {
    const outfits = await Outfit.find();

    const scoredOutfits = outfits.map((outfit) => {
      let score = 0;

      for (const key in weights) {
        const value = outfit[key];

        if (Array.isArray(value)) {
          value.forEach((val) => {
            if (prompt.includes(val.toLowerCase())) {
              score += weights[key];
            }
          });
        } else if (typeof value === "string" && prompt.includes(value.toLowerCase())) {
          score += weights[key];
        }
      }

      return { id: outfit._id, score };
    });

    const threshold = 1;

    const matchedIds = scoredOutfits
      .filter((item) => item.score >= threshold)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.id);

    res.json({ ids: matchedIds });
  } catch (err) {
    console.error("Error in getSuggestions:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllOutfits = async (req, res) => {
  try {
    const outfits = await Outfit.find();
    res.json(outfits);
  } catch (err) {
    console.error("Error fetching outfits:", err);
    res.status(500).json({ error: "Failed to fetch outfits" });
  }
};

exports.matchOutfit = async (req, res) => {
  try {
    const { targetTypes, colors } = req.body;

    if (!targetTypes || !colors || !targetTypes.length || !colors.length) {
      return res.status(400).json({ message: "targetTypes and colors are required." });
    }

    const matchedProducts = await Outfit.find({
      Type: { $in: targetTypes },
      Color: { $in: colors }
    }).select("Image Name Price Type Category Color");

    res.json({ matches: matchedProducts });
  } catch (error) {
    console.error("Error matching outfits:", error);
    res.status(500).json({ message: "Server error while matching outfits." });
  }
};