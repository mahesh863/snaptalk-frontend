import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";

const Following = () => {
  // Showing User Following
  const [following, setFollowing] = useState("");

  useEffect(() => {
    // Getting Following From Local Storage

    let f = JSON.parse(localStorage.getItem("followers")).following;
    console.log(f);
    setFollowing(f);
  }, []);
  return (
    <div className="container">
      <h3 className="text-center"> Following </h3>
      <div className="border" />
      <div>
        {/* Loop through Following To Display */}

        {following &&
          (following.length == 0 ? (
            <p
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              No Followers
            </p>
          ) : (
            following.map((values) => (
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

export default Following;
