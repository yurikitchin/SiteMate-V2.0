import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      employee {
        _id
        empName
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signUp($empName: String!, $email: String!, $phone: String!, $password: String!, $isManager: Boolean!) {
  signUp(empName: $empName, email: $email, phone: $phone, password: $password, isManager: $isManager) {
    token
    employee {
      empName
      email
      phone
      isManager
    }
  }
}
`;
// password: String = "1Deafault!", isManager: Boolean = false

export const ADD_EMP= gql`
  mutation newEmployee($empName: String!, $email: String!, $phone: String!, $password: String!, $isManager: Boolean!) {
  newEmployee(empName: $empName, email: $email, phone: $phone, password: $password, isManager: $isManager) {
    token
    employee {
      empName
      email
      phone
      isManager
    }
  }
}
`;

export const ADD_SITE = gql`
mutation newSite($siteName: String!, $siteLocation: String!, $company: String!, $siteContact: String!, $sitePhone: String!) {
  newSite(siteName: $siteName, siteLocation: $siteLocation, company: $company, siteContact: $siteContact, sitePhone: $sitePhone) {
    token
    site {
      _id
      siteName
      siteLocation
      company
      siteContact
      sitePhone
    }
  }
}
`;

export const ADD_ROSTER = gql`
mutation addRoster($dayDate: String!, $siteName: String!, $employees: [String!], $comments: String) {
  addRoster(dayDate: $dayDate, siteName: $siteName, employees: $employees, comments: $comments) {
    token
    roster {
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
}
`;

export const DELETE_EMP= gql`
mutation deleteEmployee($employeeID: String!) {
  deleteEmployee( employeeID: $employeeID) {
    token
    employee {
      _id
      }
  }
}
`;
