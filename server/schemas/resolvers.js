const { AuthenticationError } = require('apollo-server-express');
const { Employee, Site, Roster } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        employees: async () => {
            return Employee.find()
            //use employee to populate employees page
        },
        sites: async () => {
            return Site.find()
            //use site to populate sites page
        },
        rosters: async () => {
            Roster.find() 
            //user roster to populate rosters           
        } 
    }
}

module.exports = resolvers