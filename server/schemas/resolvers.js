const { AuthenticationError } = require('apollo-server-express');
const { Employee, Site, Roster } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        employees: async () => {
            return await Employee.find()
            //use employee to populate employees page
        },
        sites: async () => {
            return await Site.find()
            //use site to populate sites page
        },
        rosters: async () => {
            return await Roster.find().populate('siteName').populate('employees')
            //user roster to populate rosters           
        } 
    }
}

module.exports = resolvers