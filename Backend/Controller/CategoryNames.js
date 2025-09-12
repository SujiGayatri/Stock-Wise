const Outfit = require("../Model/StyleModel");

const getTypesByGender = async (req, res) => {
  const { gender } = req.params;

  try {
    const types = await Outfit.distinct("Type", {
      Category: { $regex: new RegExp(gender, "i") },
    });

    res.status(200).json(types);
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({ error: "Failed to fetch types" });
  }
};

module.exports = { getTypesByGender };
