import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMP } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./addEmp.css"

const AddEmp = (props) => {

  const [addEmpFormdata, setAddEmpFormData] = useState({
    empName: "",
    email: "",
    phone: "",
    password: "1Deafault!", 
    isManager: false
  });

  const [addEmp, { error, data }] = useMutation(ADD_EMP);


  const handleSignChange = (event) => {
    const { name, value } = event.target;
    setAddEmpFormData({ ...addEmpFormdata, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    console.log("start of handleformsubmit", addEmpFormdata)
    event.preventDefault();
    try {
    
      const {  data } = await addEmp({
        variables: { ...addEmpFormdata },
      });
      console.log("this is data", data);
      Auth.getToken(data.newEmployee.token)
      window.location.assign('/home')
    } catch (e) {
      console.log("there is an error with handleformsubmit", e.message)
      console.error(e);
    }
  };

  if (!props.show) {
    return null
  }

  return (
    <div className="addEmpModal">
      <div className="modalContent">
        <button className="modalClose" onClick={props.onClose}>✖</button>
        <h3 className="modalTitle" id="signTitle">
          Add Employee
        </h3>
        {data ? (
    <p>Employee Added to database </p>
  ) : ( <div> 
        <form onSubmit={handleFormSubmit}>
          <div className="signInputWrapper">
            <label htmlFor="empName">Enter your Name</label>
            <input
              type="text"
              className="modalInput"
              name="empName"
              placeholder="First + last"
              value={addEmpFormdata.empName}
              onChange={handleSignChange}
            />
            <br />

            <label htmlFor="email">Enter your email</label>
            <input
              type="text"
              className="modalInput"
              name="email"
              placeholder="Email"
              value={addEmpFormdata.email}
              onChange={handleSignChange}
            />

            <label htmlFor="phone">Enter your mobile</label>
            <input
              type="text"
              className="modalInput"
              id="phone"
              name="phone"
              placeholder="Mobile"
              value={addEmpFormdata.phone}
              onChange={handleSignChange}
            />
          </div>
          <button type="submit" className="modalSubmit" id="signSubmit">
          Add New Employee
        </button>
    
        </form>
    


      </div>
        )}{error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div>
      <div className="bckBlur"></div>
    </div>
);
};

export default AddEmp;
