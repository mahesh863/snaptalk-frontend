import React from "react";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <div className="container base-div ">
      <div className="row">
        <div className="col-lg-5 col-md-9 offset-md-2 col-sm-12  offset-lg-4">
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;
