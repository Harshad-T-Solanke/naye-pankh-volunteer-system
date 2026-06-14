const router = require('express').Router();
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');
const VolunteerProfile = require('../models/VolunteerProfile');
const Event = require('../models/Event');
const User = require('../models/User');


router.get('/volunteers', authMiddleware, adminOnly, async (req, res) => {
  try {
    const profiles = await VolunteerProfile
      .find()
      .populate('userId', 'email role');

    const volunteers = profiles
      .filter(v => v.userId)
      .map(v => ({
        _id: v._id,
        fullName: v.fullName,
        email: v.userId.email,
        phone: v.phone,
        skills: v.skills,
        totalHours: v.totalHours || 0,
        approved: v.approved || false
      }));

    res.json(volunteers);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


router.delete('/volunteers/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const profile = await VolunteerProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Volunteer not found' });
    
    await User.findByIdAndDelete(profile.userId);
    await VolunteerProfile.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/events', authMiddleware, adminOnly, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/events', authMiddleware, adminOnly, async (req, res) => {
  try {
    const event = new Event({ ...req.body, createdBy: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/events/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/events/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;