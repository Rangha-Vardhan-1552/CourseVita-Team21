const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
  feedback: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);
