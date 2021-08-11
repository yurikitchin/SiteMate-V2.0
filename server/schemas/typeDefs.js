const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Employee {
    _id: ID
    empName: String
    email: String
    password: String
    phone: String
    isManager: Boolean
}

type Site {
    _id: ID
    siteName: String
    siteLocation: String
    company: String
    siteContact: String
    sitePhone: String
}

type Roster {
    _id: ID
    dayDate: String
    siteName: Site!
    employees: [Employee]!
    comments: String
    managerID: Employee!
}


type Auth {
    token: ID!
    employee: Employee
    site: Site
    roster: Roster
}

input EmployeeInput {
    empName: String
    email: String
    password: String
    phone: String
    isManager: Boolean
}

type Query {
   employees: [Employee]
   sites: [Site]
   rosters: [Roster]
}

type Mutation {
    signUp(empName: String!, email: String!, phone: String!, password: String!, isManager: Boolean!): Auth
    login(email: String!, password: String!): Auth
    newEmployee(empName: String!, email: String!, phone: String!, password: String = "1Deafault!", isManager: Boolean = false): Auth
    newSite(siteName: String!, siteLocation: String!, company: String!, siteContact: String! sitePhone: String!): Auth
    addRoster(dayDate: String!, siteName: String!, employees: [String!], comments: String): Auth
    deleteEmployee(employeeID: ID!): Auth
    deleteSite(siteID: ID!): Auth
}

`

module.exports = typeDefs;

// type Mutation {
//     signUp(empName: String!, email: phone: Number!, String!, password: String!, isManger: Boolean!): Auth
//     login(email: String!, password: String!): Auth
//     addEmployee:(empName: String!, email: phone: Number!, String!, password: String!, isManger: Boolean!): Auth
//     addSite:(siteName: String!, siteLocation: String!, company: String!, siteContact: String! sitePhone: Number!)
//     addRoster: (dayDate: Date!, siteName: String!, employees: [{Employee}]) 
// }