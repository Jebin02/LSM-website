const Doubt = require("./doubtschema");

// Create doubt
exports.createDoubt = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const doubt = new Doubt({
      message,
      userId: req.user?._id, // optional (if auth exists)
    });

    await doubt.save();

    res.status(201).json({
      success: true,
      data: doubt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all doubts
exports.getDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find().sort({ createdAt: -1 });

    res.status(200).json(doubts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};