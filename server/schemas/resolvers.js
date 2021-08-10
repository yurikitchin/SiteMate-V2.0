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
        },
        login:async (parent, { email, password}) => {
            const employee = await Employee.findOne({ email })

            if (!employee) {
                throw new AuthenticationError('No profile with this email found!');
              }
            
            const correctPW = await employee.isCorrectPassword(password)

            if (!correctPW) {
                throw new AuthenticationError('Incorrect password!');
            }

            if(employee.isManager === true ) {
                console.log("User is manager redirect to manager homepage")
            } else {
                console.log("User is employee redirect to employee homepage")
            }

            const token = signToken(employee);
            return { token, employee};
        }
    },


}

module.exports = resolvers