const router = require('express').Router();
const Story = require('./../models/story');

router.post('/create', async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      genre,
      location,
      route,
    } = req.body;
    let story;

    if (id !== undefined) {
      story = await Story.findByIdAndUpdate(
        { _id: id },
        {
          title: title,
          description: description,
          location: location,
          route: route,
          author: req.session.userID
        }
      );
    } else {
      story = new Story();
      story.title = title;
      story.description = description;
      story.genre = genre;
      story.location = location;
      story.route = route;
      story.author = req.session.userID;
      story.community = req.session.community;
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

router.get('/community', async (req, res) => {
  try {
    let stories = await Story
      .find({ community: req.session.community })
      .sort({ createdAt: 'desc' });
    res.json(stories);
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