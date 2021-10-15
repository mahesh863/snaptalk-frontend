import React, { useEffect, useState } from "react";

//Components
import RequestCard from "../components/RequestCard";

//Css
import "../css/requests.page.css";

const Requests = ({ history }) => {
  //Get Sent and Recieved Requests
  const [user, setuser] = useState(false);
  const [followers, setFollowers] = useState("");

  //Getting Current User Data
  const getCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("userId"));
    setFollowers(JSON.parse(localStorage.getItem("followers")));
    if (currentUser) {
      setuser(currentUser);
    } else {
      //Redirecting User If Not Signed In
      setuser(false);
      history.push("/signin");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="container ">
      {user ? (
        <>
          {/* Recieve Requests */}
          {console.log(followers)}
          <h1 className="my-3 text-center">Requests</h1>

          <h2>Recieve Requests</h2>

          <div>
            {console.log(user)}
            {followers?.recieveRequest.length == 0 ? (
              <p className="text-danger text-center my-4 ">
                No new Request Found !{" "}
              </p>
            ) : (
              followers?.recieveRequest.map((reqs) => (
                <RequestCard
                  userName={reqs.name}
                  userId={reqs._id}
                  profilePic={reqs.profilePic}
                />
              ))
            )}
          </div>
          {/* Sent Requests */}
          <div className="border"></div>
          <div className="my-5">
            <h2>Sent Requests</h2>
            <div>
              {followers?.sentRequest.length == 0 ? (
                <p className="text-center text-danger my-4">
                  No Pending Requests !
                </p>
              ) : (
                followers?.sentRequest.map((reqs) => (
                  <RequestCard
                    userName={reqs.name}
                    userId={reqs._id}
                    profilePic={reqs.profilePic}
                    sent={true}
                  />
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <h1>Please Login!</h1>
      )}
    </div>
  );
};

export default Requests;
