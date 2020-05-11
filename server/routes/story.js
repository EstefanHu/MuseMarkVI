const router = require('express').Router();
const Story = require('../models/story');
const User = require('../models/user');

router.post('/create', async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      genre,
      coordinates,
      community
    } = req.body;
    let story;

    // Check if exist
    // Upate if does ELSE make new entry
    if (id !== undefined) {
      story = await Story.findByIdAndUpdate(
        { _id: id },
        {
          title: title,
          description: description,
          coordinates: coordinates,
        }
      );
    } else {
      const authorInfo = await User.findById(req.session.userID);
      const authorName = authorInfo.firstName + ' ' + authroInfo.lastName
      story = new Story();
      story.title = title;
      story.description = description;
      story.genre = genre;
      story.author = authorName;
      story.community = community;
    }
    await story.save();

    res.json('Story Published');
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.get('/library', async (req, res) => {
  try {
    let stories = await Story
      .find({ author: req.session.userID })
      .sort({ createdAt: 'desc' });
    res.json(stories);
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.get('/community/:community', async (req, res) => {
  try {
    let stories = await Story
      .find({ community: req.params.community })
      .sort({ createdAt: 'desc' });

    res.json({"stories": stories});
  } catch (error) {
    res.status(500).json('Error: ' + error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    let story = await Story.findById(req.params.id);
    res.json(story);
  } catch (error) {
    res.type('text').status(500).send('Error: ' + error);
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.send('Deleted Story');
  } catch (error) {
    res.type('text').status(500).send('Error: ' + error);
  }
});

module.exports = router;