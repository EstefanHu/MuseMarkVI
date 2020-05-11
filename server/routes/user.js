const router = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    let checkIfUserExist = await User.findOne({ email: email });
    if (checkIfUserExist) return res.json({ 'error': 'Email already in use' });
    if (password < 8) return res.json({ 'error': 'Password is not long enough' });

    let user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user = await user.save();

    req.session.userID = user._id;
    res.json("Registration successful");
  } catch (error) {
    res.status(500).json('error: ' + error);
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
      return res.json({ error: 'Email or Password was incorrect' });

    //https://coderrocketfuel.com/article/using-bcrypt-to-hash-and-check-passwords-in-node-js
    await bcrypt.compare(password, user.password, async function (err, isMatch) {
      if (err) throw err;
      if (!isMatch) return res.json({ error: 'Email or Password was incorrect' });
      req.session.userID = user._id;
      res.json('Login successful');
    });
  } catch (error) {
    res.status(500).json('Error:  ' + error);
  }
});

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    res.json(user);
  } catch (error) {
    res.status(500).json('Error:  ' + error);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    let checkIfUserExist = await User.findOne({ email: req.body.email });
    if (checkIfUserExist) res.json({ 'Error': 'User Already exists' });

    let user = await User.findById(req.params.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user = await user.save();
    res.send('Successfully updated User');
  } catch (error) {
    res.type('text').status(500).send('Error:  ' + error);
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('Deleted User');
  } catch (error) {
    res.type('text').status(500).send('Error:  ' + error);
  }
});

router.get('/logout', (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) throw err
    });
    res.json({ Message: 'User logged out.' });
  } catch (error) {
    res.type('text').status(500).send('Error:  ' + error);
  }
});

module.exports = router;