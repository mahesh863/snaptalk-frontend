import React from "react";

import "../css/notificationCard.component.css";

const NotificationCard = ({ title, date }) => {
  return (
    <div className="notification-card-base p-2">
      <span>{title}</span>
      <span>{date}</span>
      {/* <span>Delete</span> */}
    </div>
  );
};

export default NotificationCard;
