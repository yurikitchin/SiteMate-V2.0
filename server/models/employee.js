const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Site = require('./sites');

const employeeSchema = new Schema({
  empName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  phone:{
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },

  isManager: {
    type: Boolean,
    required: true,
  },

  managedSites: [{
    type: Schema.Types.ObjectId,
    ref: Site,
    trim: true,
  }],

  managedEmployees: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    unique: false,
  }]

});

// set up pre-save middleware to create password
employeeSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
employeeSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Employee = model('Employee', employeeSchema);

module.exports = Employee;