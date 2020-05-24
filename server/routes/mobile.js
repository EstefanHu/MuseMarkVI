const router = require('express').Router();
const Story = require('../models/story');
const User = require('../models/user');

router.get('/base', async (req, res) => {
  try {
    let feed = await Story
      .find({}) // TODO: Add Community filter from request object
      .sort({ createdAt: 'desc' });
    let library = await Story
      .find({}) // TODO: Add saving stories to library functionality
      .sort({ createdAt: 'desc' });
    let portfolio = await Story
      .find({}) // TODO: Add userId from sessions
      .sort({ createdAt: 'desc' });
    res.json({
      feed,
      library,
      portfolio
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

module.exports = router;