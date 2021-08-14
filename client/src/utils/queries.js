import { gql } from '@apollo/client';

// export const QUERY_EMPLOYEE = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_USER = gql`
query User {
  user {
    _id
    empName
    managedSites {
      _id
      siteName
      siteLocation
      company
      siteContact
      sitePhone
    }
    managedEmployees {
      _id
      empName
      email
      phone
    }
  }
}
`;

export const QUERY_ROSTER = gql`
query rosters($rostersManager: String!){
  rosters(manager: $rostersManager) {
    _id
    dayDate
    siteName {
      siteName
    }
    employees {
      empName
    }
    comments
  }
}
`;