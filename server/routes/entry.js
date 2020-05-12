const router = require('express').Router();
const Entry = require('../models/entry');
const User = require('../models/user');

router.post('/create', async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      genre,
      longitude,
      latitude,
      community,
      body
    } = req.body;
    let entry;

    if (id !== undefined) {
      entry = await Entry.findByIdAndUpdate(
        { _id: id },
        {
          title: title,
          description: description,
          coordinates: [longitude, latitude],
          body: body,
        }
      );
    } else {
      const authorInfo = await User.findById(req.session.userID);
      const authorName = authorInfo.firstName + ' ' + authroInfo.lastName
      entry = new Entry();
      entry.title = title;
      entry.description = description;
      entry.genre = genre;
      entry.author = authorName;
      entry.community = community;
      entry.body = body;
      entry.coordinates = [longitude, latitude];
    }
    await entry.save();

    res.json('Entry Published');
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.get('/library', async (req, res) => {
  try {
    let entries = await Entry
      .find({ author: req.session.userID })
      .sort({ createdAt: 'desc' });
    res.json(entries);
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.get('/community/:community', async (req, res) => {
  try {
    let entries = await Entry
      .find({ community: req.params.community })
      .sort({ createdAt: 'desc' });

    res.json({"entries": entries});
  } catch (error) {
    res.status(500).json('Error: ' + error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    let entry = await Entry.findById(req.params.id);
    res.json(entry);
  } catch (error) {
    res.type('text').status(500).send('Error: ' + error);
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.send('Deleted Entry');
  } catch (error) {
    res.type('text').status(500).send('Error: ' + error);
  }
});

module.exports = router;