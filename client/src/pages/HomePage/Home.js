import React from "react";
import "./styles.css";
import Employee from "../../components/employees/Employee";

export default function Home() {
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
            <a href="#">Rosters</a>
          </li>
          <li>
            <a href="#">Sites</a>
          </li>
          <li>
            <a href="#">Employees</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>

      <div className="pageBackground"></div>

      <Employee />
  
     </div>
  );
}
