import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../../utils/mutations";

import Auth from "../../utils/auth";
import "./signModal.css";

const SignUp = (props) => {

  // const [passwordData, setPasswordData] = useState({
  //   pword:"",
  //   confPword: "",
  // })

  const [signUpFormdata, setSignUpFormData] = useState({
    empName: "",
    email: "",
    password: "",
    phone: "",
    isManager: true,
  });

  const [signUp, { error, data }] = useMutation(SIGNUP);

  // const confirmPassword = (event) => {
  //   const { name, value } = event.target;
  //   setPasswordData({ ...passwordData, [name]: value })

  //   if (passwordData.pword.value === passwordData.confPword.value) {
  //     console.log("this is the password", passwordData.pword.value)
  //     setSignUpFormData({ ...signUpFormdata, password: passwordData.pword.value })
      
  //   } else {
  //     window.alert("Passwords do not match")
  //   }

  // }

  const handleSignChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormData({ ...signUpFormdata, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    console.log("start of handleformsubmit", signUpFormdata)
    event.preventDefault();
    try {
      const {  data: {
        signUp: { token },
      },} = await signUp({
        variables: { ...signUpFormdata },
      });
      console.log("this is data", data);

      Auth.login(token);
    } catch (e) {
      console.log("there is an error with handleformsubmit", e.message)
      console.error(e);
    }
  };

  if (!props.show) {
    return null
  }

  return (
    <div className="signUpModal">
      <div className="modalContent">
        <button className="modalClose" onClick={props.onClose}>✖</button>
        <h3 className="modalTitle" id="signTitle">
          Sign Up
        </h3>
        {data ? (
    <p>you have signed up </p>
  ) : ( <div> 
        <form onSubmit={handleFormSubmit}>
          <div className="signInputWrapper">
            <label htmlFor="empName">Enter your Name</label>
            <input
              type="text"
              className="modalInput"
              name="empName"
              placeholder="First + last"
              value={signUpFormdata.empName}
              onChange={handleSignChange}
            />
            <br />

            <label htmlFor="email">Enter your email</label>
            <input
              type="text"
              className="modalInput"
              name="email"
              placeholder="Email"
              value={signUpFormdata.email}
              onChange={handleSignChange}
            />

            <label htmlFor="phone">Enter your mobile</label>
            <input
              type="text"
              className="modalInput"
              id="phone"
              name="phone"
              placeholder="Mobile"
              value={signUpFormdata.phone}
              onChange={handleSignChange}
            />

            <label htmlFor="pword">Enter your password</label>
            <input
              type="text"
              className="modalInput"
              name="password"
              placeholder="Password"
              value={signUpFormdata.password}
              onChange={handleSignChange}
            />
{/* 
            <label htmlFor="confPword">Confirm your password</label>
            <input
              type="text"
              name="confPword"
              className="modalInput"
              placeholder="Confirm Password"
              value={passwordData.confPword}
              onClick={confirmPassword} */}
            {/* /> */}
          </div>
          <button type="submit" className="modalSubmit" id="signSubmit">
          Join SiteMate
        </button>
        </form>
    


      </div>
        )}{error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div>
      <div className="bckBlur" onClick={props.onClose}></div>
    </div>
);
};

export default SignUp;
