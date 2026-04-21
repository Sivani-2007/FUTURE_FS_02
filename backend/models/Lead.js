const mongoose = require('mongoose');
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { 
    type: String, 
    enum: ['website', 'referral', 'social', 'event', 'other'],
    default: 'website'
  },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'converted'],
    default: 'new'
  },
  notes: [{
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);