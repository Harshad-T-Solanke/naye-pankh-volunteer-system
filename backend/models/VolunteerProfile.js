const mongoose = require('mongoose');

const VolunteerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  phone: String,
  skills: [String],
  availability: String,
  totalHours: {
    type: Number,
    default: 0
  },
  joinedEvents: [{
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    hoursWorked: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('VolunteerProfile', VolunteerProfileSchema);