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

            const employee = await Employee.create({ empName, email, phone, password, isManager});
            const dbManager = await Employee.findById(context.employee._id);
            dbManager.managedEmployees.push(employee._id);
            console.log("this is employee", employee )
            await dbManager.save();
            const token = signToken(dbManager);
            return  { token, employee } 
        },

        // newSite(siteName: String!, siteLocation: String!, company: String!, siteContact: String! sitePhone: Number!) Auth
        newSite: async (parent, { siteName, siteLocation, company, siteContact, sitePhone }, context) => {

            let addSite = await Site.create({ siteName, siteLocation, company, siteContact, sitePhone });
            const dbManager = await Employee.findById(context.employee._id);
            dbManager.managedSites.push(addSite._id)
            console.log("this is addSite ......", addSite)
            await dbManager.save();
            const token = signToken(dbManager);
            return  { token, site:addSite } 
        },

        // addRoster: (dayDate: Date!, siteName: String!, employees: [{Employee}], comments: String): Auth
        addRoster: async (parent, { dayDate, siteName, employees, comments}, context) => {
            console.log("this is context",context.employee)
            const dbManager = await Employee.findById(context.employee._id);
            // add dbmanager to managerID pass to roster.create
            let newRoster = {
                dayDate: dayDate,
                siteName: "",
                employees: [],
                comments: comments,
                managerID: dbManager._id
            }
            //find site name, update variable pass to roster.create
           
            const rosterSite = await Site.findOne({siteName: siteName});
            console.log("this is the found rosterSite", rosterSite)
            newRoster.siteName = rosterSite._id
             //loop through employee array, find employees, pass array of id's to roster.create
            const employeeDB = await Employee.find({})
            employees.forEach((employeeName) => {
                employeeDB.forEach((emp) => {
                    if (emp.empName === employeeName) {
                        newRoster.employees.push(emp._id)
                    }
                })
            })
            console.log("this is the final roster", newRoster);
            let roster = await Roster.create(newRoster);
            let newroster = await Roster.find({_id: roster._id}).populate('siteName').populate('employees').exec()
            roster = newroster[0]
            const token = signToken(dbManager);
            return  { token, roster } 
        },

        // deleteEmployee: async (parent, { employeeID }, context) => {
        //     const manager = context.employee
        //     const managedEmployees = context.employee.managedEmployees
        //     const employeeToDelete = ""
        //     managedEmployees.forEach((employee) => {
        //         if (employee._id === employeeID) {
                    
        //         }
        //     })
            


                // const employee = await Employee.findByIdAndDelete(employeeID)
                // return employee
        // }
    },


}

module.exports = resolvers