const Score = require("../models/Score");

// @desc    Add a new score
// @route   POST /api/scores
// @access  Private
const addScore = async (req, res) => {
  try {
    const { score, date } = req.body;

    if (score < 1 || score > 45) {
      return res.status(400).json({ message: "Score must be between 1 and 45" });
    }

    const newScore = await Score.create({
      user: req.user._id,
      score,
      date: date || Date.now(),
    });

    // Check if user has more than 5 scores
    const userScores = await Score.find({ user: req.user._id }).sort({ date: 1 });
    if (userScores.length > 5) {
      // Remove the oldest score
      const oldestScore = userScores[0];
      await Score.findByIdAndDelete(oldestScore._id);
    }

    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's recent scores
// @route   GET /api/scores
// @access  Private
const getScores = async (req, res) => {
  try {
    // Return latest 5 scores, newest first
    const scores = await Score.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a score
// @route   DELETE /api/scores/:id
// @access  Private
const deleteScore = async (req, res) => {
  try {
    const score = await Score.findById(req.params.id);

    if (!score) {
      return res.status(404).json({ message: "Score not found" });
    }

    // Make sure user owns the score
    if (score.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Score.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Score removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Edit a score
// @route   PUT /api/scores/:id
// @access  Private
const editScore = async (req, res) => {
  try {
    const { score } = req.body;
    
    if (score < 1 || score > 45) {
      return res.status(400).json({ message: "Score must be between 1 and 45" });
    }

    const existingScore = await Score.findById(req.params.id);

    if (!existingScore) {
      return res.status(404).json({ message: "Score not found" });
    }

    // Make sure user owns the score
    if (existingScore.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    existingScore.score = score;
    await existingScore.save();

    res.status(200).json(existingScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addScore, getScores, deleteScore, editScore };
