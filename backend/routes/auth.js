const router = require('express').Router();
const User = require('../models/User');
const VolunteerProfile = require('../models/VolunteerProfile');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  try {

    const { email, password, fullName, phone, skills, availability } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = new User({
      email,
      password,
      role: 'user'
    });

    await user.save();

    const profile = new VolunteerProfile({
      userId: user._id,
      fullName,
      phone,
      skills,
      availability
    });

    await profile.save();

    res.status(201).json({
      message: 'Registration successful',
      userId: user._id
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role   
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role   
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;