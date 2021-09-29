import { load } from "dotenv";
import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import MyPostCard from "../components/MyPostCard";

//Css
import "../css/myprofile.page.css";

//API Calls Helpers
import { getAllPost } from "../helper/Calls/MyProfile";

const MyProfile = ({ history }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState("");

  var defaultProfilePic =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/240px-Circle-icons-profile.svg.png";

  const getPost = async () => {
    const userId = await JSON.parse(localStorage.getItem("userId"));
    const token = await localStorage.getItem("token");
    const user = await JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
      getAllPost(userId, token)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data.posts);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push("/signin");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className="profile-base container">
        <h1 className=" pt-3">My Profile</h1>
        <div>
          <img
            src={
              currentUser.profilePic
                ? currentUser.profilePic
                : defaultProfilePic
            }
            className="profile-pic"
          />

          <h3 className="my-3  text-center ">{currentUser.name}</h3>

          <p>{currentUser?.bio}</p>
        </div>
      </div>
      <div className="border" />

      <h2 className="text-center my-3">Your Posts</h2>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner> </Spinner>
        </div>
      ) : posts.length === 0 ? (
        <h4 className="text-center text-danger ">No Post Found!</h4>
      ) : (
        <div className="your-posts-div container">
          {posts.map((post) => (
            <MyPostCard className="grid-items" image={post.image} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyProfile;
