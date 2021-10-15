import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";

const Followers = () => {
  // Showing User Followers
  const [followers, setFollowers] = useState("");

  useEffect(() => {
    // Getting Followers From Local Storage
    let f = JSON.parse(localStorage.getItem("followers")).followers;
    setFollowers(f);
  }, []);
  return (
    <div className="container">
      <h3 className="text-center"> Followers </h3>
      <div className="border" />
      <div>
        {/* Loop through Followers To Display */}

        {followers &&
          (followers.length == 0 ? (
            <p
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              No Followers
            </p>
          ) : (
            followers.map((values) => (
              <RequestCard
                userId={values._id}
                userName={values.name}
                profilePic={values.profilePic}
                sent={true}
                view={true}
              />
            ))
          ))}
      </div>
    </div>
  );
};

export default Followers;
