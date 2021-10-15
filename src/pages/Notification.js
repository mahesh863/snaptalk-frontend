import React, { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";

//Css
import "../css/notification.page.css";
import { getAllNotification } from "../helper/Calls/Notification";

const Notification = ({ history }) => {
  //Show Notifications
  const [notification, setNotification] = useState("");

  const getUserAndNotification = () => {
    //Getting User info from localstorage
    const userId = JSON.parse(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    console.log(token);
    //Redirecting User If not Singed In
    if (!userId) {
      history.push("/signin");
    }

    //API call for getting user's notifications
    getAllNotification(userId, token)
      .then((response) => {
        console.log(response.data);
        setNotification(response.data.notifications);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserAndNotification();
  }, []);

  return (
    <div className="container">
      <h1 className="my-3 text-center">Notification</h1>
      {/* Displaying Notifications */}
      <div>
        {notification ? (
          notification.map((notify) => (
            <NotificationCard title={notify.title} date={notify.date} />
          ))
        ) : (
          <h2 className="text-center">No New Notification!</h2>
        )}
      </div>
    </div>
  );
};

export default Notification;
