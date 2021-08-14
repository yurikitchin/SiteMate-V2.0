import { gql } from '@apollo/client';

export const QUERY_EMPLOYEE = gql`
query employees {
  employees {
    _id
    empName
    email
    phone
    isManager
  }
}
`;
export const QUERY_EMPBYID = gql`
query empbyID($employeeEmployeeId: ID!) {
  employees {
    _id
    empName
    email
    phone
    isManager
  }
  employee(employeeId: $employeeEmployeeId) {
    empName
    email
    phone
    isManager
  }
}
`;

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