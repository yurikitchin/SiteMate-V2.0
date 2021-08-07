const { Schema, model } = require('mongoose');

const siteSchema = new Schema({
  siteName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  siteLocation: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  siteContact: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  sitePhone:{
    type: Number,
    required: true,
    // unique: true,
    trim: true,
  },
});

const Site = model('sites', siteSchema);

module.exports = Site;