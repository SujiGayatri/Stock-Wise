const Outfit = require("../Model/StyleModel");

const getOccasionByGender = async (req, res) => {
  const { gender } = req.params;
  try {
    const occasions = await Outfit.distinct("Occasion", {
      Category: { $regex: new RegExp(gender, "i") },
    });

    res.status(200).json(occasions);
  } catch (err) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch occasions" });
  }
};

module.exports = { getOccasionByGender };
