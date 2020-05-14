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
    res.status(500).json('error:  ' + error);
  }
});

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    res.json(user);
  } catch (error) {
    res.status(500).json('error:  ' + error);
  }
});

router.post('/update', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email
    } = req.body;

    let check = await User.findOne({ email });

    if (check) {
      if (check._id != req.session.userID)
        return res.json({ error: 'Email already in use' });

      await check.update({
        firstName,
        lastName
      });
    } else {
      await User.findByIdAndUpdate(
        { _id: req.session.userID },
        {
          firstName,
          lastName,
          email
        }
      );
    }

    res.json({ msg: 'Success' });
  } catch (error) {
    res.status(500).json('error:  ' + error);
  }
});

router.post('/resecure', async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    await User.findById(
      req.session.userID,
      function (err, user) {
        if (err) throw err;

        user.comparePassword(currentPassword, async function (err, isMatch) {
          if (err) throw err;
          if (!isMatch) return res.json({ error: 'Your password was incorrect.' });

          user.password = newPassword;
          await user.save();
          res.json({ msg: 'password updated' });
        });
      });
  } catch (error) {
    res.status(500).json('error:  ' + error);
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('Deleted User');
  } catch (error) {
    res.status(500).json('error:  ' + error);
  }
});

router.get('/logout', (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) throw err
    });
    res.json({ Message: 'User logged out.' });
  } catch (error) {
    res.status(500).json('error:  ' + error);
  }
});

module.exports = router;