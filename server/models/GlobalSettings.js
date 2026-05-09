const mongoose = require("mongoose");

const globalSettingsSchema = mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'jackpotRollover'
  value: { type: Number, default: 0 }
});

const GlobalSettings = mongoose.model("GlobalSettings", globalSettingsSchema);
module.exports = GlobalSettings;
