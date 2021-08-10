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
        },
    },
//     signUp(empName: String!, email: phone: String!, password: String!, isManger: Boolean!): Auth
    Mutation: {
        signUp: async (parent, { empName, email, phone, password, isManager }) => {
            const employee = await Employee.create({ empName, email, phone, password, isManager})
            const token = signToken(employee)
            return { employee, token }
        }
    },


}

module.exports = resolvers