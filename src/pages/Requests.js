import React, { useEffect, useState } from "react";

//Components
import RequestCard from "../components/RequestCard";

//Css
import "../css/requests.page.css";

const Requests = ({ history }) => {
  const [user, setuser] = useState(false);
  const [more, setMore] = useState(false);

  const getCurrentUser = async () => {
    const currentUser = await JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setuser(currentUser);
    } else {
      setuser(false);
      history.push("/signin");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="container col-lg-4 offset-lg-4 ">
      {user ? (
        <>
          <h1 className="my-3 text-center">Requests</h1>

          <h2>Recieve Requests</h2>

          <div>
            {console.log(user)}
            {user.recieveRequest.length == 0 ? (
              <p className="text-danger text-center my-4 ">
                No new Request Found !{" "}
              </p>
            ) : (
              user.recieveRequest.map((reqs) => (
                <RequestCard
                  userName={reqs.name}
                  userId={reqs._id}
                  profilePic={reqs.profilePic}
                />
              ))
            )}
          </div>

          <div className="border"></div>
          <div className="my-5">
            <h2>Sent Requests</h2>
            <div>
              {user ? (
                <p className="text-center text-danger my-4">
                  No Pending Requests !
                </p>
              ) : (
                user.sentRequest.map((reqs) => (
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
