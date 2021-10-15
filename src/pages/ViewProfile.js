import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MyPostCard from "../components/MyPostCard";
import { viewUserProfile } from "../helper/Calls/Friends";

//Css
import "../css/myprofile.page.css";

const ViewProfile = () => {
  // View User

  //Getting userid from url
  const { userId } = useParams();
  const [user, setUser] = useState("");
  const defaultProfilePic =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/240px-Circle-icons-profile.svg.png";

  useEffect(() => {
    //API Call for user info
    viewUserProfile(userId)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {user && (
        <div>
          <div className="profile-base container">
            <h1 className=" pt-3">User Profile</h1>
            <div>
              <img
                src={user.profilePic ? user.profilePic : defaultProfilePic}
                className="profile-pic"
              />
              <h3 className="my-3  text-center ">{user.name}</h3>
            </div>
          </div>

          <div className="border" />

          <h2 className="text-center my-3">User's Posts</h2>
          {user.posts.length === 0 ? (
            <h4 className="text-center text-danger ">No Post Yet!</h4>
          ) : (
            <div className="your-posts-div container">
              {user.posts.map((post) => (
                <MyPostCard className="grid-items" image={post.image} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
