const express = require("express");
const router = express.Router();
const { getUsers, runDraw, getAllScores, adminDeleteScore, createCharity, adminDeleteCharity, verifyWinner, getWinners, getReports } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/users").get(protect, admin, getUsers);
router.route("/draws").post(protect, admin, runDraw);
router.route("/scores").get(protect, admin, getAllScores);
router.route("/scores/:id").delete(protect, admin, adminDeleteScore);
router.route("/charities").post(protect, admin, createCharity);
router.route("/charities/:id").delete(protect, admin, adminDeleteCharity);
router.route("/winners/:id/verify").put(protect, admin, verifyWinner);
router.route("/winners").get(protect, admin, getWinners);
router.route("/reports").get(protect, admin, getReports);

module.exports = router;
