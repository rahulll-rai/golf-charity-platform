const User = require("../models/User");
const Draw = require("../models/Draw");
const Winner = require("../models/Winner");
const Score = require("../models/Score");
const GlobalSettings = require("../models/GlobalSettings");
const { sendEmail } = require("../utils/emailService");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Run the monthly draw
// @route   POST /api/admin/draws
// @access  Private/Admin
const runDraw = async (req, res) => {
  try {
    const { month, year, isSimulation, drawType } = req.body;

    const winningNumbers = [];
    
    if (drawType === "Algorithmic") {
      // Find 5 most frequent numbers
      const allScores = await Score.find({});
      const frequency = {};
      allScores.forEach(s => {
        frequency[s.score] = (frequency[s.score] || 0) + 1;
      });
      const sortedFreq = Object.entries(frequency).sort((a,b) => b[1] - a[1]);
      for (let i = 0; i < 5 && i < sortedFreq.length; i++) {
        winningNumbers.push(Number(sortedFreq[i][0]));
      }
      // Fill the rest if not enough scores
      while(winningNumbers.length < 5) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        if (!winningNumbers.includes(randomNum)) winningNumbers.push(randomNum);
      }
    } else {
      while (winningNumbers.length < 5) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        if (!winningNumbers.includes(randomNum)) winningNumbers.push(randomNum);
      }
    }

    const activeUsers = await User.find({ subscriptionStatus: "active" });
    const subscriptionFee = 10;
    const totalPool = activeUsers.length * subscriptionFee;

    let settings = await GlobalSettings.findOne({ key: "jackpotRollover" });
    if (!settings) settings = await GlobalSettings.create({ key: "jackpotRollover", value: 0 });
    
    const jackpotRollover = settings.value;
    
    const pool5 = (totalPool * 0.40) + jackpotRollover;
    const pool4 = totalPool * 0.35;
    const pool3 = totalPool * 0.25;

    let winners5 = [];
    let winners4 = [];
    let winners3 = [];

    for (const user of activeUsers) {
      const userScores = await Score.find({ user: user._id }).sort({ date: -1 }).limit(5);
      const userScoreNumbers = userScores.map((s) => s.score);

      let matchCount = 0;
      userScoreNumbers.forEach((num) => {
        if (winningNumbers.includes(num)) matchCount++;
      });

      if (matchCount === 5) winners5.push(user._id);
      if (matchCount === 4) winners4.push(user._id);
      if (matchCount === 3) winners3.push(user._id);
    }

    const newRollover = winners5.length === 0 ? pool5 : 0;

    const buildWinnerDocs = (userIds, matchType, prizeName, totalPrizePool) => {
      const splitPrize = userIds.length > 0 ? (totalPrizePool / userIds.length).toFixed(2) : 0;
      return userIds.map(uid => ({
        user: uid,
        matchType,
        prize: prizeName,
        prizeAmount: Number(splitPrize),
        verificationStatus: 'Pending',
        payoutStatus: 'Pending'
      }));
    };

    const simulatedWinners = [
      ...buildWinnerDocs(winners5, 5, "5-Match Jackpot", pool5),
      ...buildWinnerDocs(winners4, 4, "4-Match Prize", pool4),
      ...buildWinnerDocs(winners3, 3, "3-Match Prize", pool3),
    ];

    if (isSimulation) {
      return res.status(200).json({
        draw: { month, year, winningNumbers, totalPool, jackpotRollover, isSimulation: true, drawType },
        winners: simulatedWinners,
        message: "Simulation successful. Nothing was saved to the database."
      });
    }

    // Save to DB
    const draw = await Draw.create({
      month, year, winningNumbers, status: "completed", drawType, totalPool, jackpotRollover
    });

    const winnersToInsert = simulatedWinners.map(w => ({ ...w, draw: draw._id }));
    const insertedWinners = await Winner.insertMany(winnersToInsert);

    // Send emails to winners
    for (const w of insertedWinners) {
      const u = await User.findById(w.user);
      if (u) {
        sendEmail(
          u.email,
          "🎉 You're a Winner!",
          `Congratulations ${u.name}!\n\nYou matched ${w.matchType} numbers in the ${month}/${year} Draw and won the ${w.prize} worth $${w.prizeAmount.toFixed(2)}.\n\nPlease log in to your dashboard to upload your proof for verification.`
        );
      }
    }

    settings.value = newRollover;
    await settings.save();

    res.status(201).json({ draw, winners: insertedWinners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Charity = require("../models/Charity");

// @desc    Get all scores
// @route   GET /api/admin/scores
// @access  Private/Admin
const getAllScores = async (req, res) => {
  try {
    const scores = await Score.find({}).populate("user", "name email").sort({ date: -1 });
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete any score
// @route   DELETE /api/admin/scores/:id
// @access  Private/Admin
const adminDeleteScore = async (req, res) => {
  try {
    await Score.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Score deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new charity
// @route   POST /api/admin/charities
// @access  Private/Admin
const createCharity = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const charity = await Charity.create({ name, description, image });
    res.status(201).json(charity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a charity
// @route   DELETE /api/admin/charities/:id
// @access  Private/Admin
const adminDeleteCharity = async (req, res) => {
  try {
    await Charity.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Charity deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Winner Proof & Payout
// @route   PUT /api/admin/winners/:id/verify
// @access  Private/Admin
const verifyWinner = async (req, res) => {
  try {
    const { verificationStatus, payoutStatus } = req.body;
    const winner = await Winner.findById(req.params.id);
    if (!winner) return res.status(404).json({ message: "Winner not found" });

    if (verificationStatus) winner.verificationStatus = verificationStatus;
    if (payoutStatus) winner.payoutStatus = payoutStatus;
    await winner.save();

    res.status(200).json(winner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all winners
// @route   GET /api/admin/winners
// @access  Private/Admin
const getWinners = async (req, res) => {
  try {
    const winners = await Winner.find({}).populate("user", "name email").populate("draw").sort({ createdAt: -1 });
    res.status(200).json(winners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reports
// @route   GET /api/admin/reports
// @access  Private/Admin
const getReports = async (req, res) => {
  try {
    const activeUsersCount = await User.countDocuments({ subscriptionStatus: "active" });
    const charities = await Charity.find({});
    const totalCharityContributions = charities.reduce((acc, c) => acc + c.totalDonations, 0);
    const totalDraws = await Draw.countDocuments({});
    
    // Total prize pool awarded (sum of all prizeAmount in Winners)
    const allWinners = await Winner.find({});
    const totalPrizePoolAwarded = allWinners.reduce((acc, w) => acc + (w.prizeAmount || 0), 0);

    res.status(200).json({
      activeUsers: activeUsersCount,
      totalCharityContributions,
      totalDraws,
      totalPrizePoolAwarded
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, runDraw, getAllScores, adminDeleteScore, createCharity, adminDeleteCharity, verifyWinner, getWinners, getReports };
