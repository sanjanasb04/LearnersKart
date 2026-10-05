const mongoose = require('mongoose');

const LiveSessionSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.Mixed },
  topic: { type: String, required: true, trim: true },
  instructor: { type: mongoose.Schema.Types.Mixed },
  startTime: { type: Date, default: Date.now },
  duration: { type: Number, default: 60 },
  mode: { type: String, default: 'Past Recording' },
  meetingLink: { type: String, default: '' },
  maxSeats: { type: Number, default: 300 },
  attendees: [{ type: mongoose.Schema.Types.Mixed }],
  status: { type: String, default: 'Completed' },
  recordingUrl: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('LiveSession', LiveSessionSchema);
