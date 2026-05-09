const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    draw: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matchType: { type: Number, required: true },
    prize: { type: String, required: true },
    prizeAmount: { type: Number, default: 0 },
    verificationProof: { type: String, default: null }, // URL or string for proof
    verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
    payoutStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Winner", winnerSchema);
