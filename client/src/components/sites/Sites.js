import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import "./siteStyles.css";

export default function Sites() {
  const { loading, error, data } = useQuery(QUERY_USER);

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
      <div className="siteWrap">
        {user.managedSites.map((site) => (
          <section className="siteCard" key={site._id}>
            <h1 className="cardTitle"> {site.siteName} </h1>
            <div className="siteInfo">
              <h4> Address: {site.siteLocation}</h4>
              <h4> Company: {site.company} </h4>
              <h4> Contact Name: {site.siteContact} </h4>
              <h4> Mobile: {site.sitePhone} </h4>
            </div>
          </section>
        ))}
      </div>
    );
  }
}
