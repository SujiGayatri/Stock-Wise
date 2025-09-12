const express = require("express");
const router = express.Router();
const { getTypesByGender } = require("../Controller/CategoryNames");

router.get("/:gender/type", getTypesByGender);

module.exports = router;
