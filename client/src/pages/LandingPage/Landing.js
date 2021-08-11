import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_EMPLOYEE } from "../../utils/mutations";
import "./styles.css";

import Auth from "../../utils/auth";

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, { error, data }] = useMutation(LOGIN_EMPLOYEE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    return name === 'email' ? setEmail(value) : setPassword(value);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email, password },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
       setEmail('')
      setPassword('')

  };

  return (
    <div>
      <div id="landingGridWrapper">
        <h1 id="landingTitle">
          SiteMate
          <span>
            <i id="fas fa-hard-hat"></i>
          </span>
        </h1>
        <div id="loginWrap">
          <h3 id="loginTitle">Login</h3>
          {data ? (
            <p>you are now logged in </p>
          ) : (
            <div>
              <form id="logInputWrapper" onSubmit={handleFormSubmit}>
                <input
                  name='email'
                  type="email"
                  className="logInput"
                  id="logEmail"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />
                <input
                  name='password'
                  type="password"
                  className="logInput"
                  id="logPassword"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
                <button
                  className="loginBtn"
                  type="submit"
                  id="logSubit"
                  onClick={handleChange}
                >
                  Login
                </button>
              </form>
              {/* <div id="signUp">
                <h3 id="signText">not a member?</h3>
                <input
                  // className="loginBtn"
                  id="signUpSubmit"
                  type="button"
                  id="signUpBtn"
                  value="Sign Up"
                />
              </div> */}
            </div>
          )}
          {/* {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Login;
