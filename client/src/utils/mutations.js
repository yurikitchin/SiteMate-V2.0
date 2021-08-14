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
  mutation signUp($EmpName: String!, $Email: String!, $Phone: String!, $Password: String!, $IsManager: Boolean!) {
  signUp(empName: $EmpName, email: $Email, phone: $Phone, password: $Password, isManager: $IsManager) {
    # token
    employee {
      _id
      empName
      email
      password
      phone
      isManager
    }
  }
}
`;

// export const ADD_THOUGHT = gql`
//   mutation addThought($thoughtText: String!) {
//     addThought(thoughtText: $thoughtText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//       }
//     }
//   }
// `;

// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
