import React, { useState } from "react";

//Css
import "../css/global.css";
import "../css/signin.css";

//Social Login
import GoogleLogin from "react-google-login";

//Reactstrap
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

//Router
import { Link } from "react-router-dom";

//React-Toastify
import { toast } from "react-toastify";

//Helpers
import { emailSignin, googleSignin } from "../helper/Calls/Auth";

//Get Profile Helper
import { getProfile } from "../helper/Calls/MyProfile";
import { getAllInteractions } from "../helper/Calls/Friends";

//dotenv
require("dotenv").config();

const Signin = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = () => {
    emailSignin(email, password)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userId", JSON.stringify(res.data?.userId));
        localStorage.setItem("token", res.data?.token);

        getProfile(res.data?.userId, res.data?.token)
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            history.push("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        if (err) {
          toast.error("Failed To Signin", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(err);
        }
      });
  };

  const onSuccess = (googleData) => {
    googleSignin(googleData.tokenId)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("userId", JSON.stringify(res.data?.userId));
          localStorage.setItem("token", res.data?.token);

          getProfile(res.data?.userId, res.data?.token)
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data.user));
              toast.success("SignIn Successful!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              history.push("/");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Failed To Signin", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(err);
        }
      });
  };

  const onFailure = (err) => {
    toast.error("Please Try Again!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/signup");
  };

  return (
    <div className="base-div">
      <div className="container base-container ">
        <h3 style={{ textAlign: "center" }}>SignIn</h3>

        <div className="input-div">
          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Form>

          <Button className="buttons" onClick={handelSubmit}>
            Submit
          </Button>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <Link to="signup">Signup</Link>
          </p>

          <p style={{ textAlign: "center", marginTop: "10px" }}>OR</p>

          <GoogleLogin
            disabled={false}
            className="buttons"
            clientId="163781510653-o7996ee5f0scidi1fdcdel6l868fffn5.apps.googleusercontent.com"
            buttonText="Login With Google"
            isSignedIn={true}
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
