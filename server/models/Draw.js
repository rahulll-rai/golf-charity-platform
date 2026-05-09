const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema(
  {
    month: {
      type: Number, // 1-12
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    winningNumbers: [{ type: Number }],
    status: { type: String, enum: ["simulated", "completed"], default: "completed" },
    drawType: { type: String, enum: ["Random", "Algorithmic"], default: "Random" },
    totalPool: { type: Number, default: 0 },
    jackpotRollover: { type: Number, default: 0 },
    isSimulation: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Draw", drawSchema);
