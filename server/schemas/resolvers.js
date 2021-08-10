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
        },

        newEmployee: async (parent, { empName, email, phone, password, isManager }, context) => {
            
            console.log("this is context",context.employee)

            const employee = await Employee.create({ empName, email, phone, password, isManager});
            const dbManager = await Employee.findById(context.employee._id);
            console.log("from db, db manager", dbManager);
            dbManager.managedEmployees.push(employee._id);
            await dbManager.save();
            const token = signToken(dbManager);
            return  { token, employee } 
        },

        // newSite(siteName: String!, siteLocation: String!, company: String!, siteContact: String! sitePhone: Number!) Auth
        newSite: async (parent, { siteName, siteLocation, company, siteContact, sitePhone }, context) => {
            console.log("this is context",context.employee)
            const addSite = await Site.create({ siteName, siteLocation, company, siteContact, sitePhone });
            const dbManager = await Employee.findById(context.employee._id);
            console.log("this is add site", addSite)
            console.log("from db, db manager", dbManager);
            dbManager.managedSites.push(addSite._id)
            console.log("db manager after add Site", dbManager);
            await dbManager.save();
            const token = signToken(dbManager);
            return  { token, addSite } 
        }
    },


}

module.exports = resolvers