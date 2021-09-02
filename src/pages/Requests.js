import React from "react";

//Components
import RequestCard from "../components/RequestCard";

const Requests = () => {
  return (
    <div className="container col-lg-4 offset-lg-4 ">
      <h1 className="my-3 text-center">Requests</h1>

      <div>
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
      </div>

      <div className="my-5">
        <h2>Sent Requests</h2>
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
      </div>
    </div>
  );
};

export default Requests;
