import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import './employeeStyles.css'

export default function Employee() {
  const { loading, error, data } = useQuery(QUERY_USER);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error retrieving user data", error.message);
  }

  if (!data.user) {
      console.log("please kill me", data.user)
  }

  //   if (Auth.loggedIn() === employeeId) {
//     return <Redirect to="/home" />;
//   }

  else if (data.user) {
    const user = data.user;
console.log(data.user.managedEmployees[0])
    return (
        <div>
        {user.managedEmployees.map((emp) => (
          <section className="employeeCard" key={emp._id}>
            <h4>{emp.empName}</h4>
            <h3> {emp.email} </h3>
            <h4> {emp.phone} </h4>
          </section>     
        ))}
        </div>
      );
  }
}
