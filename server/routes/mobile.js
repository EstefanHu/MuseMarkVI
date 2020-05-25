const router = require('express').Router();
const Story = require('../models/story');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    let checkIfUserExist = await User.findOne({ email: email });
    if (checkIfUserExist) return res.json({ err: 'Email already in use' });
    if (password < 8) return res.json({ err: 'Password is not long enough' });

    let user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user = await user.save();

    req.session.userID = user._id;

    res.json({ msg: 'Registration Complete!' });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;
    let user = await User.findOne({ email: email });

    if (!user)
      return res.json({ err: 'Email or Password was incorrect' });

    //https://coderrocketfuel.com/article/using-bcrypt-to-hash-and-check-passwords-in-node-js
    await bcrypt.compare(password, user.password, async function (err, isMatch) {
      if (err) throw err;
      if (!isMatch) return res.json({ err: 'Email or Password was incorrect' });
      req.session.userID = user._id;
      res.json({ msg: 'Login successful' });
    });
  } catch (error) {
    res.status(500).json('error: ' + error);
  }
});

router.post('/logout', async (req, res) => {
  try {
    console.log('logout');
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
})

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

router.get('/refreshFeed', async (req, res) => {
  try {
    console.log('feed');
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.get('/refreshLibrary', async (req, res) => {
  try {
    if (!req.session.userID) return res.json({ err: 'No user session' });

    const user = await User.findById(req.session.userID);
    if (user.library.length === 0) return res.json({ msg: 'library is empty' });

    const library = await Story.find({
      '_id': { $in: user.library }
    }, function (err, docs) {
      if (err) throw err;
      console.log(docs);
    });

    res.json({
      msg: 'success',
      payload: library
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.get('/refreshPortfolio', async (req, res) => {
  try {
    console.log('portfolio');
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.post('/addToLibrary', async (req, res) => {
  try {
    if (!req.session.userID) return res.json({err: 'No user session'});

    // TODO: reoptimize query
    let user = await User.findById(req.session.userID);
    user.library.push(req.body.id);
    user.save();
    res.json({ msg: 'Saved to Library' });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.post('/removeFromLibrary', async (req, res) => {
  try {
    res.json({ msg: 'Removed from Library' });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

router.get('/test', async (req, res) => {
  try {
    console.log('hello');
    console.log(req.session);
    res.json({ msg: 'testing' });
  } catch (error) {
    res.status(500).json({ 'Error: ': error });
  }
});

module.exports = router;