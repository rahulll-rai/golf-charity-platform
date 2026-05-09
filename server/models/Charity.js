const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/300x200?text=Charity",
    },
    totalDonations: {
      type: Number,
      default: 0,
    },
    upcomingEvents: [{
      title: String,
      date: String,
      location: String
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Charity", charitySchema);
