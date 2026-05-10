const express = require("express");
const router = express.Router();
const { subscribe, getMySubscription, createCheckoutSession, cancelSubscription } = require("../controllers/subscriptionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/subscribe").post(protect, subscribe);
router.route("/create-checkout-session").post(protect, createCheckoutSession);
router.route("/cancel").post(protect, cancelSubscription);
router.route("/me").get(protect, getMySubscription);

module.exports = router;
