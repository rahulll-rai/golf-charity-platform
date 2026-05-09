const express = require("express");
const router = express.Router();
const { addScore, getScores, deleteScore, editScore } = require("../controllers/scoreController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addScore).get(protect, getScores);
router.route("/:id").delete(protect, deleteScore).put(protect, editScore);

module.exports = router;
