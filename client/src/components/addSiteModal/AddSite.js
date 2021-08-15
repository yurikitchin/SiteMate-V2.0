import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SITE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./addSite.css"

const AddSite = (props) => {

  const [addSiteFormdata, setAddSiteFormData] = useState({
    siteName: "",
    siteLocation: "",
    company: "",
    siteContact: "",
    sitePhone: "",
  });

  const [addSite, { error, data }] = useMutation(ADD_SITE);
  console.log("this is data from use mutation", data)

  const handleSignChange = (event) => {
    const { name, value } = event.target;
    setAddSiteFormData({ ...addSiteFormdata, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    console.log("start of handleformsubmit", addSiteFormdata)
    event.preventDefault();
    try {
      
      const { data } = await addSite({
        variables: { 
          siteName: addSiteFormdata.siteName,
          siteLocation: addSiteFormdata.siteLocation,
          company: addSiteFormdata.company,
          siteContact: addSiteFormdata.siteContact,
          sitePhone: addSiteFormdata.sitePhone,
         }
      });
      console.log("this is data", data);
      //Change toke update
      Auth.getToken(data.newSite.token)
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
    <div className="addSiteModal">
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
            <label htmlFor="siteName">Enter Site Name</label>
            <input
              type="text"
              className="modalInput"
              name="siteName"
              placeholder="Site"
              value={addSiteFormdata.siteName}
              onChange={handleSignChange}
            />
            <br />

            <label htmlFor="siteLocation">Enter Site Location</label>
            <input
              type="text"
              className="modalInput"
              name="siteLocation"
              placeholder="Address"
              value={addSiteFormdata.siteLocation}
              onChange={handleSignChange}
            />

            <label htmlFor="company">Enter Site Company</label>
            <input
              type="text"
              className="modalInput"
              id="company"
              name="company"
              placeholder="Company"
              value={addSiteFormdata.company}
              onChange={handleSignChange}
            />
            

            <label htmlFor="siteContact">Enter Company Contact</label>
            <input
              type="text"
              className="modalInput"
              name="siteContact"
              placeholder="Site Contact"
              value={addSiteFormdata.siteContact}
              onChange={handleSignChange}
            />

            <label htmlFor="sitePhone">Enter Company Contact Phone</label>
            <input
              type="text"
              className="modalInput"
              name="sitePhone"
              placeholder="Contact Phone Number"
              value={addSiteFormdata.sitePhone}
              onChange={handleSignChange}
            />
          </div>
          

          
          <button type="submit" className="modalSubmit" id="signSubmit">
          Add New Site
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

export default AddSite;
