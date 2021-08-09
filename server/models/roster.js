const { Schema, model } = require('mongoose');
const Employee = require('./employee');
const Site = require('./sites');

const rosterSchema = new Schema({
  dayDate: {
    type: Date,
   min: '01-01-1990',
   max: '01-01-2050'
  },
  siteName: {
    type: Schema.Types.ObjectId,
    ref:Site,
    trim: true,
  },
  employees: [
    {
    type: Schema.Types.ObjectId,
    ref:Employee,
    unique: false,
  }
],
  comments:{
    type: String,
    unique: false,
    trim: true,
  },
});

const Roster = model('roster', rosterSchema);

module.exports = Roster;