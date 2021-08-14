import React, { useState } from "react";
import "./styles.css";
import Employee from "../../components/employees/Employee";
import Sites from "../../components/sites/Sites";
import Auth from "../../utils/auth";
import { Redirect } from "react-router-dom";
import Roster from "../../components/roster/Roster";


export default function Home() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  let [employee, setShowE] = useState(false);
  let [roster, setShowR] = useState(true);
  let [site, setShowS] = useState(false);

  function showComponent(compName) {
    console.log(compName);
    switch (compName) {
      case "falseemployee":
        employee = setShowE(true);
        roster = setShowR(false);
        site = setShowS(false);
        console.log(employee)
        break;
      case "falsesite":
        employee = setShowE(false);
        roster = setShowR(false);
        site = setShowS(true);
        break;
      case "falseroster":
        employee = setShowE(false);
        roster = setShowR(true);
        site = setShowS(false);
        break;
        default:
        break;
    }
  }

  if (Auth.loggedIn() === false) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <nav className="homePageNav">
        <h1 id="homeTitle">
          SiteMate
          <span>
            <i className="fas fa-hard-hat"></i>
          </span>
        </h1>

        <ul id="navList">
          <li>
            <a onClick={() => showComponent(roster + "roster")}>Rosters</a>
          </li>
          <li>
            <a onClick={() => showComponent(site + "site")}>Sites</a>
          </li>
          <li>
            <a onClick={() => showComponent(employee + "employee")}>Employees</a>
          </li>
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        </ul>
      </nav>

      <div className="pageBackground"></div>

      {employee && <Employee />}

      {site && <Sites />}

      {roster && <Roster />}
    </div>
  );
}
