const Winner = require("../models/Winner");

// @desc    Get user's winnings
// @route   GET /api/winners/me
// @access  Private
const getMyWinnings = async (req, res) => {
  try {
    const winnings = await Winner.find({ user: req.user._id }).populate("draw");
    res.status(200).json(winnings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload proof for a winning
// @route   PUT /api/winners/:id/proof
// @access  Private
const uploadProof = async (req, res) => {
  try {
    const { proofUrl } = req.body;
    const winner = await Winner.findOne({ _id: req.params.id, user: req.user._id });

    if (!winner) {
      return res.status(404).json({ message: "Winning record not found" });
    }

    winner.verificationProof = proofUrl;
    winner.verificationStatus = 'Pending'; // Remains pending until admin reviews
    await winner.save();

    res.status(200).json(winner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyWinnings, uploadProof };
