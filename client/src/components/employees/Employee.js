import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import "./employeeStyles.css";
import AddEmp from "../addEmpModal/addEmpModal";

export default function Employee() {
  const { loading, error, data } = useQuery(QUERY_USER);

  const [show, setShow] = React.useState(false);

  console.log(data)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error retrieving user data", error.message);
  }

  if (!data.user) {
    console.log("please kill me", data.user);
  } else if (data.user) {
    const user = data.user;
    return (
      <>
        <div className="employeeWrap">
          {user.managedEmployees.map((emp) => (
            <section className="employeeCard" key={emp._id}>
              <h4>{emp.empName}</h4>
              <h3> {emp.email} </h3>
              <h4> {emp.phone} </h4>
            </section>
          ))}
        </div>

        <div>
          <button type="button" onClick={() => setShow(true)}>Add Employee ➕ </button>
          <AddEmp onClose={() => setShow(false)} show={show} />
        </div>
    </>
    );
  }
}
