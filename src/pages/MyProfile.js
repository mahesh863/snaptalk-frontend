import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Form,
  Input,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import MyPostCard from "../components/MyPostCard";

//Css
import "../css/myprofile.page.css";

//API Calls Helpers
import {
  addNewProfilePic,
  getAllPost,
  getProfile,
} from "../helper/Calls/MyProfile";
import { updateItemOnLocalStorage } from "../helper/storageOperations";

const MyProfile = ({ history }) => {
  //Show User Profile
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState("");
  const [followers, setFollowers] = useState("");
  const [modal, setModal] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  var defaultProfilePic =
    "https://firebasestorage.googleapis.com/v0/b/socialapp-5ec19.appspot.com/o/profilePics%2Fprofile.png?alt=media&token=4ae37e2b-30ea-449c-8e8f-b134d9d2fa14";

  // Toggle For Profile Pic Modal
  const toggle = () => setModal(!modal);

  //API Call For Getting User Posts
  const getPost = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
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

  //Change Profile Picture
  const handelProfilePicChange = () => {
    setPicLoading(true);
    const userId = JSON.parse(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profileImage", newProfilePic, newProfilePic.name);

    //API Call For Changing Profile Picture
    addNewProfilePic(userId, token, formData)
      .then((res) => {
        //Handeling response  by closing modal and making user API call updating user info in the localstorage with new Info
        setModal(false);
        getProfile(userId, token)
          .then((res) => {
            updateItemOnLocalStorage("user", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            console.log(err);
          });
        toast.success("Image Updated!");
        setPicLoading(false);
      })
      .catch((err) => {
        // Handeling Error by showing a toast
        setModal(false);
        setPicLoading(false);
        toast.error("Failed To Update!");
      });
  };

  useEffect(() => {
    //Getting User Post and Followers Length
    getPost();
    let userFollowers = JSON.parse(localStorage.getItem("followers"));
    setFollowers(userFollowers);
  }, []);

  return (
    <>
      <div className="profile-base container">
        <h1 className=" pt-3">My Profile</h1>
        <div>
          <img
            onClick={toggle}
            src={
              currentUser.profilePic
                ? currentUser.profilePic
                : defaultProfilePic
            }
            className="profile-pic"
          />

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Select New Picture</ModalHeader>
            <ModalBody>
              <Form>
                <Input
                  type="file"
                  onChange={(e) => setNewProfilePic(e.target.files[0])}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              {picLoading ? (
                <Spinner> </Spinner>
              ) : (
                <span
                  className="custom-button button-primary-color"
                  onClick={handelProfilePicChange}
                >
                  Submit
                </span>
              )}
            </ModalFooter>
          </Modal>

          <h3 className="my-3  text-center ">{currentUser.name}</h3>

          <p>{currentUser?.bio}</p>
        </div>
      </div>

      <div>
        <Link to="followers">
          <p className="text-center" style={{ fontWeight: "bold" }}>
            Followers: {followers?.followers?.length}
          </p>
        </Link>
        <Link to="following">
          <p className="text-center" style={{ fontWeight: "bold" }}>
            Following: {followers?.following?.length}
          </p>
        </Link>
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
