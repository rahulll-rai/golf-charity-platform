const express = require("express");
const router = express.Router();
const { getMyWinnings, uploadProof } = require("../controllers/winnerController");
const { protect } = require("../middleware/authMiddleware");

router.route("/me").get(protect, getMyWinnings);
router.route("/:id/proof").put(protect, uploadProof);

module.exports = router;
