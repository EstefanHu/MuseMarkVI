const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  genre: {
    type: String,
    requried: true,
    default: ''
  },
  credibility: {
    type: Number,
    default: 0
  },
  community: {
    type: String,
    default: ''
  },
  coordinates: {
    type: [Number],
    default: 0
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Story', storySchema);