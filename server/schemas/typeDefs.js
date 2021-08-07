const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Employee {
    _id: ID
    firstName: String
    lastName: String
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
    site: [Site]!
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