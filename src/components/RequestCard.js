import axios from "axios";
import React, { useEffect, useState } from "react";

//Css
import "../css/requestCard.component.css";
import { API } from "../helper/API";
import {
  cancelFollowRequest,
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
} from "../helper/Calls/Friends";

import { getProfile } from "../helper/Calls/MyProfile";
import { updateItemOnLocalStorage } from "../helper/storageOperations";

const RequestCard = ({
  userName = "",
  userId = "",
  profilePic = "",
  sent = false,
}) => {
  var defaultProfilePic =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/240px-Circle-icons-profile.svg.png";

  const [didSend, setDidSend] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [action, setAction] = useState("");

  const handelSentRequest = () => {
    setDidSend(true);
    sendFollowRequest(currentUserId, userId)
      .then((resonse) => {
        if (resonse.data.err) {
          setDidSend(false);
        }
        console.log(user);
        getProfile(currentUserId, token)
          .then((res) => {
            updateItemOnLocalStorage("user", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setDidSend(false);
        console.log(err);
      });
  };

  const handelCancelRequest = () => {
    setDidSend(false);
    cancelFollowRequest(currentUserId, userId)
      .then((resonse) => {
        if (resonse.data.err) {
          console.log("Error in Cancel!");
          setDidSend(true);
        }

        getProfile(currentUserId, token)
          .then((res) => {
            updateItemOnLocalStorage("user", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setDidSend(true);
        console.log(err);
      });
  };

  const handelAcceptRequest = () => {
    acceptFollowRequest(currentUserId, userId)
      .then((res) => {
        setAction(1);
        getProfile(currentUserId, token)
          .then((res) => {
            updateItemOnLocalStorage("user", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  const handelRejectRequest = () => {
    rejectFollowRequest(currentUserId, userId)
      .then((res) => {
        setAction(0);

        getProfile(currentUserId, token)
          .then((res) => {
            updateItemOnLocalStorage("user", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setToken(localStorage.getItem("token"));
      setCurrentUserId(JSON.parse(localStorage.getItem("userId")));

      user.sentRequest.map((value) => {
        if (value._id == userId) {
          setDidSend(true);
        }
      });
    }
  }, [JSON.parse(localStorage.getItem("user"))]);

  return (
    <div className="request-card-base-div">
      <span>
        <img
          src={profilePic ? profilePic : defaultProfilePic}
          className="request-card-image"
        />
      </span>
      <span style={{ fontWeight: "bold", width: "40%" }}>
        {userName.length < 20 ? userName : userName.slice(0, 20) + "..."}
      </span>

      {!sent ? (
        <span>
          {!action ? (
            <>
              <span
                className="custom-button button-primary-color mx-0"
                onClick={handelAcceptRequest}
              >
                {" "}
                Confirm{" "}
              </span>
              <span
                className="custom-button button-secondary-color mx-1"
                onClick={handelRejectRequest}
              >
                {" "}
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  Rejected...
                </p>
              </span>
            </>
          ) : action == 0 ? (
            "Rejected..."
          ) : (
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Accepted...
            </p>
          )}
        </span>
      ) : currentUserId == userId ? (
        <span className="btn" style={{ visibility: "hidden" }}>
          Send
        </span>
      ) : (
        <span>
          {!didSend ? (
            <span
              className="custom-button button-primary-color mx-2"
              onClick={handelSentRequest}
            >
              {" "}
              Send{" "}
            </span>
          ) : (
            <span
              className="custom-button button-secondary-color mx-2"
              onClick={handelCancelRequest}
            >
              {" "}
              Cancel{" "}
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default RequestCard;
