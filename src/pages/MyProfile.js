import React from "react";
import MyPostCard from "../components/MyPostCard";

//Css
import "../css/myprofile.page.css";

const MyProfile = () => {
  return (
    <>
      <div className="profile-base container">
        <h1 className=" pt-3">My Profile</h1>
        <div>
          <img
            src="https://source.unsplash.com/random"
            className="profile-pic"
          />

          <h3 className="my-3">Mahesh Choudhury</h3>

          <p>Please Add Your Bio...</p>
        </div>
      </div>
      <div className="border" />

      <h2 className="text-center my-3">Your Posts</h2>

      <div className="your-posts-div container">
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
        <MyPostCard className="grid-items" />
      </div>
    </>
  );
};

export default MyProfile;
