const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Employee {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    phone: Number
    isManager: Boolean
}

type Site {
    _id: ID
    siteName: String
    siteLocation: String
    siteContact: String
    sitePhone: Number
}

type Roster {
    _id: ID
    dayDate: Date
    site: [Site]!
    employees: [Employee]!
    comments: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
   employees: [Employee]
   sites: [Site]
   roster: [Roster]
}

`