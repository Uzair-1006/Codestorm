const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'hr'], default: 'candidate' },
  resume: { type: String }, // file name of the uploaded resume
  id: { type: String }, // government ID or unique identifier
});

module.exports = mongoose.model('User', userSchema);
