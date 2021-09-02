import React from "react";

//Css
import "../css/requestCard.component.css";

const RequestCard = () => {
  return (
    <div className="request-card-base-div">
      <span>
        <img
          src="https://source.unsplash.com/random"
          className="request-card-image"
        />
      </span>
      <span style={{ fontWeight: "bold" }}>User Name</span>
      <span>
        <span className="btn btn-success mx-2"> Confirm </span>
        <span className="btn btn-danger mx-2"> Reject </span>
      </span>
    </div>
  );
};

export default RequestCard;
