const Charity = require("../models/Charity");
const User = require("../models/User");

// @desc    Get all charities
// @route   GET /api/charities
// @access  Public
const getCharities = async (req, res) => {
  try {
    const charities = await Charity.find({});
    res.status(200).json(charities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Select a charity for the user
// @route   POST /api/charities/select
// @access  Private
const selectCharity = async (req, res) => {
  try {
    const { charityId, percentage } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.selectedCharity = charityId;
    user.donationPercentage = percentage;
    await user.save();

    res.status(200).json({ message: "Charity selected successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single charity
// @route   GET /api/charities/:id
// @access  Public
const getCharityById = async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id);
    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }
    res.status(200).json(charity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Make an independent one-time donation
// @route   POST /api/charities/:id/donate
// @access  Private
const donateIndependent = async (req, res) => {
  try {
    const { amount } = req.body;
    const charity = await Charity.findById(req.params.id);
    if (!charity) return res.status(404).json({ message: "Charity not found" });

    charity.totalDonations += Number(amount);
    await charity.save();

    res.status(200).json({ message: "Donation successful", charity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCharities, selectCharity, getCharityById, donateIndependent };
