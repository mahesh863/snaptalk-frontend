import React from "react";

//Css
import "../css/posts.component.css";

//Icons
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiSend } from "react-icons/bi";

//Reactstrap
import { Button, Form, Input } from "reactstrap";

const Posts = () => {
  return (
    <div className="post-base">
      <img className="post-image" src="https://source.unsplash.com/random" />
      <div className="mx-2 my-3 ">
        <BsHeart className="icon" />
        <BsHeartFill className="icon heart-fill" />{" "}
        <span className="mx-2">324 Likes</span>
      </div>

      <div className="comment-div">
        <span className="mx-1">324 Comments</span>
        <Form>
          <span className="comment-box">
            <Input className="form-input" placeholder="Comment..." />
          </span>
          <span className="send-icon">
            <BiSend className="icon" />
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Posts;
