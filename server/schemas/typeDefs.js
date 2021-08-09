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
}

type Auth {
    token: ID!
    user: Employee
}

type Query {
   employees: [Employee]
   sites: [Site]
   rosters: [Roster]
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