const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  maxVolunteers: {
    type: Number,
    default: 50
  },
  registered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteerProfile'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);