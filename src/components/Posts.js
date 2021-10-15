import React, { useEffect, useState } from "react";

//Css
import "../css/posts.component.css";

//Icons
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiSend } from "react-icons/bi";

//Reactstrap
import { Form, Input } from "reactstrap";

// API Helpers
import { likePhoto, unlikePhoto } from "../helper/Calls/Posts";
import { toast } from "react-toastify";

const Posts = ({
  image,
  likes,
  totalComments,
  postId,
  userName,
  profilePic,
}) => {
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(likes.length);
  var defaultProfilePic =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/240px-Circle-icons-profile.svg.png";

  const handelLike = () => {
    setLiked(true);
    setTotalLikes(totalLikes + 1);
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("userId"));

    likePhoto(token, userId, postId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLiked(false);
      });
  };

  const handelUnlike = () => {
    console.log(postId);
    setLiked(false);
    setTotalLikes(totalLikes - 1);
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("userId"));
    unlikePhoto(token, userId, postId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.err);
        setLiked(true);
      });
  };

  const handelComments = () => {
    toast.warn("Comments Has Been Turned Off For Now");
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    likes.map((like) => {
      if (like == userId) {
        setLiked(true);
      }
    });
  }, []);

  return (
    <div className="post-base">
      <div className="my-2 profile-info-div ">
        <img
          src={profilePic ? profilePic : defaultProfilePic}
          className="post-profile-pic"
        />

        <p className="username">{userName}</p>
      </div>

      <img className="post-image" src={image} />
      <div className="mx-2 my-3 ">
        {liked ? (
          <BsHeartFill onClick={handelUnlike} className="icon heart-fill" />
        ) : (
          <BsHeart onClick={handelLike} className="icon" />
        )}

        <span className="mx-2" style={{ fontWeight: "bold" }}>
          {totalLikes} Likes
        </span>
      </div>

      <div className="comment-div">
        <span className="mx-1" style={{ fontWeight: "bold" }}>
          {totalComments} Comments
        </span>
        <Form>
          <span className="comment-box">
            <Input className="form-input" placeholder="Comment..." />
          </span>
          <span className="send-icon">
            <BiSend className="icon" onClick={handelComments} />
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Posts;
