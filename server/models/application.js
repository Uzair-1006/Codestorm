const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  resumeUrl: String,
  coverLetter: String,
  spamCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
