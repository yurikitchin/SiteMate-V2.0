import React, { useState } from "react";
import { empty, useQuery } from "@apollo/client";
import { QUERY_USER} from "../../utils/queries";
import "./employeeStyles.css";
import AddEmp from "../addEmpModal/addEmpModal";
import { DELETE_EMP  } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

export default function Employee() {

  const [deleteEmp, delData, delError] = useMutation(DELETE_EMP)
  let id = ""
  const handleDeleteEmp = async (e) => {
     console.log("this is id", e.target)
     const emp = e.target.value;
     console.log("this is emp", typeof emp)
    try {
    const { delData } = await deleteEmp({variables: {eployeeID: emp}})
    //   // console.log("delete employee data",data)
      Auth.getToken(data.employee.token)
    } catch (err) {
      console.error(err);
    }
  };

  const { loading, error, data } = useQuery(QUERY_USER);

  const [show, setShow] = React.useState(false);

  console.log("this is USE_QUERY",data)

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
              <button type="submit" value={emp._id} onClick={handleDeleteEmp}>Delete</button>
            </section>
          ))}
        </div>

        <div className="addBtn">
          <button type="button" onClick={() => setShow(true)}>Add Employee ➕ </button>
          <AddEmp onClose={() => setShow(false)} show={show} />
        </div>
    </>
    );
  }
}
