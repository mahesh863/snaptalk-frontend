import React from "react";

//Css
import "../css/mypostcard.component.css";

const MyPostCard = () => {
  return (
    <div className="my-post-card-base">
      <img
        src="https://source.unsplash.com/random"
        className="profile-post-image"
      />
    </div>
  );
};

export default MyPostCard;
