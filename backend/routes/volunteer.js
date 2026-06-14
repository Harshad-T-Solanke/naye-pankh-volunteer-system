const router = require('express').Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const VolunteerProfile = require('../models/VolunteerProfile');
const Event = require('../models/Event');
const User = require('../models/User');


router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const profile = await VolunteerProfile.findOne({ userId: req.user.id });
    const user = await User.findById(req.user.id);
    res.json({ ...profile.toObject(), email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const profile = await VolunteerProfile.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/events', authMiddleware, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    const profile = await VolunteerProfile.findOne({ userId: req.user.id });
    
    const eventsWithStatus = events.map(event => ({
      ...event.toObject(),
      isJoined: profile.joinedEvents.some(je => je.eventId.toString() === event._id.toString())
    }));
    
    res.json(eventsWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/events/:eventId/join', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    const profile = await VolunteerProfile.findOne({ userId: req.user.id });
    
    if (profile.joinedEvents.some(je => je.eventId.toString() === event._id.toString())) {
      return res.status(400).json({ error: 'Already joined this event' });
    }
    
    profile.joinedEvents.push({ eventId: event._id });
    await profile.save();
    
    event.registered.push(profile._id);
    await event.save();
    
    res.json({ message: 'Successfully joined event' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/my-events', authMiddleware, async (req, res) => {
  try {
    const profile = await VolunteerProfile.findOne({ userId: req.user.id }).populate('joinedEvents.eventId');
    const myEvents = profile.joinedEvents.map(je => je.eventId);
    res.json(myEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;