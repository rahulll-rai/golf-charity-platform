const express = require("express");
const router = express.Router();
const { getCharities, selectCharity, getCharityById, donateIndependent } = require("../controllers/charityController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getCharities);
router.route("/select").post(protect, selectCharity);
router.route("/:id").get(getCharityById);
router.route("/:id/donate").post(protect, donateIndependent);

module.exports = router;
