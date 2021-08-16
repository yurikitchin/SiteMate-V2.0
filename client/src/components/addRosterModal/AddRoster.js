import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ROSTER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./addRoster.css"

const AddRoster = (props) => {
  const [employeeCards, SetemployeeCards] = useState({reload:false})

  
    //===============================find managed employees ==============================//
    // const { loading, error, data } = useQuery(QUERY_USER);
  
      
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    // if (error) {
    //   console.log("Error retrieving user data", error.message);
    // }
  
    // if (!data.user) {
    //   console.log("please kill me", data.user);
    // }

    // console.log("this is data.user",data.user)
    // ============================= add roster form ======================================///

    const [addRoster, { error, data }] = useMutation(ADD_ROSTER);
  const [addRosterFormdata, setAddRosterFormData] = useState({
    dayDate: "",
    siteName: "",
    employees: "",
    comments: ""
    });

//   console.log("this is data from use mutation", data)

  const handleSignChange = (event) => {
    const { name, value } = event.target;
    setAddRosterFormData({ ...addRosterFormdata, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    console.log("start of handleformsubmit", addRosterFormdata)
    event.preventDefault();
    try {
      
      const { data } = await addRoster({
        variables: { ...addRosterFormdata }
      });
      console.log("this is data", data);
      //Change toke update
      Auth.getToken(data.newRoster.token)
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
    <div className="addRosterModal">
      <div className="modalContent">
        <button className="modalClose" onClick={props.onClose}>✖</button>
        <h3 className="modalTitle" id="signTitle">
          Add Roster
        </h3>
        {data ? (
    <p>Roster Added to database </p>
  ) : ( <div> 
         <form onSubmit={handleFormSubmit}>
          <div className="signInputWrapper">
            <label htmlFor="dayDate">Enter Date</label>
            <input
              type="text"
              className="modalInput"
              name="dayDate"
              placeholder="date"
              value={addRosterFormdata.dayDate}
              onChange={handleSignChange}
            />
            <br />
            
            <label htmlFor="siteLocation">Enter Site Name</label>
            <input
              type="text"
              className="modalInput"
              name="siteName"
              placeholder="Address"
              value={addRosterFormdata.siteName}
              onChange={handleSignChange}
            />

            <label htmlFor="company">Enter Employees</label>
            <input
              type="text"
              className="modalInput"
              id="employees"
              name="employees"
              placeholder="Company"
              value={addRosterFormdata.employees}
              onChange={handleSignChange}
            />
            

            <label htmlFor="siteContact">Enter Coments</label>
            <input
              type="text"
              className="modalInput"
              name="comments"
              placeholder="Comments"
              value={addRosterFormdata.comments}
              onChange={handleSignChange}
            />

          </div>
          

          
          <button type="submit" className="modalSubmit" id="signSubmit">
          Add New Roster
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

export default AddRoster;