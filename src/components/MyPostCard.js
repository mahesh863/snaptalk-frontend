import React from "react";

//Css
import "../css/mypostcard.component.css";

const MyPostCard = ({ image }) => {
  return (
    <div className="my-post-card-base">
      <img src={image} className="profile-post-image" />
    </div>
  );
};

export default MyPostCard;
