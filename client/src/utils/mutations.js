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