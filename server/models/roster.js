const { Schema, model } = require('mongoose');
const Employee = require('./employee');

const rosterSchema = new Schema({
  dayDate: {
    type: Date,
   min: '01-01-1990',
   max: '01-01-2050'
  },
  site: {
    type: Schema.Types.ObjectId,
    ref: Site
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref:Employee,
  }],
  comments:{
    type: String,
    unique: true,
    trim: true,
  },
});

const Roster = model('roster', rosterSchema);

module.exports = Roster;