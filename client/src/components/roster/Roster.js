import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ROSTER } from "../../utils/queries";
import "./rosterStyles.css";
import Auth from "../../utils/auth";
import "./rosterStyles.css"

export default function Roster() {
  const userID = Auth.getProfile().data._id;

  // console.log("this is manager.......", userID)
  const { loading, error, data } = useQuery(QUERY_ROSTER, {
    variables: { rostersManager: userID },
  });

  console.log("this is data........", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error retrieving user data", error.message);
  }

  if (!data.rosters) {
    console.log("please kill me", data.rosters);
  } else if (data.rosters) {
    
    return (
      <div>
        <div className="rosterWrap">
          {data.rosters.map((roster) => (
            <section className="rosterCard" key={roster._id}>
              <h1 className="rosterTitle"> Roster for {roster.dayDate} </h1>
              <div className="rosterInfo">
                <h4> Site: {roster.siteName.siteName}</h4>
                <h4> Rostered Staff:</h4>
                {roster.employees.map((emp) => (
                  <p>{emp.empName} </p>
                ))}

                <h4> Manger Comments: </h4>
                <p>{roster.comments}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }
}
