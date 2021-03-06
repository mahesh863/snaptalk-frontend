import React, { useEffect, useState } from "react";
import { Form, Input } from "reactstrap";
import { Spinner } from "reactstrap";
//Css
import "../css/addPost.page.css";

import axios from "axios";
import { API } from "../helper/API";
import { toast } from "react-toastify";

const AddPost = ({ history }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [loading, setloading] = useState(false);

  const handelAddPhoto = (e) => {
    setImage(e.target.files[0]);
  };

  const handelAdd = () => {
    setloading(true);

    //Setting up form data to send to backend
    const formData = new FormData();
    formData.append("postImage", image, image.name);
    formData.append("captions", caption);

    //API Call
    axios({
      url: `${API}/create/post/${userId}`,
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: formData,
    })
      .then((res) => {
        setloading(false);
        //Redirecting User
        history.push("/");
        //Showing Toast
        toast.success("Post Added Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        //Handeling Eror In API Request
        setloading(false);
        toast.error("Failed To Add Post!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    //Setting User Data For  Easy Access
    let user = JSON.parse(localStorage.getItem("userId"));

    if (user) {
      setUserId(user);
      setToken(localStorage.getItem("token"));
    } else {
      //Redirecting User If Not Authenticated
      history.push("/signin");
    }
  }, []);

  return (
    <>
      {loading ? (
        // Show Spinner While Waiting for API response
        <div className="loading-div">
          <Spinner type="grow" className="mx-1" color="primary">
            {" "}
          </Spinner>
          <Spinner type="grow" className="mx-1" color="primary">
            {" "}
          </Spinner>
          <Spinner type="grow" className="mx-1" color="primary">
            {" "}
          </Spinner>
        </div>
      ) : (
        <>
          <h1 className="text-center p-1">Add Post</h1>
          <div className="container add-post-main-base ">
            <div className="add-post-base">
              {/* Post From */}
              <Form className="p-3">
                <Input
                  type="file"
                  className="my-3 form-base"
                  onChange={(e) => handelAddPhoto(e)}
                />
                <Input
                  type="textarea"
                  className="my-3"
                  placeholder="Captions..."
                  onChange={(e) => setCaption(e.target.value)}
                />
                <span
                  className="custom-button button-primary-color button-span  "
                  onClick={handelAdd}
                >
                  {" "}
                  Add
                </span>
              </Form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddPost;
