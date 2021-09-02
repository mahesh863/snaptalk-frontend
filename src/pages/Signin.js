import React, { useState } from "react";

//Css
import "../css/global.css";
import "../css/signin.css";

//Social Login
import GoogleLogin from "react-google-login";

//axios import
import axios from "axios";
import { API } from "../helper/API";

//Reactstrap
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

//Router
import { Link } from "react-router-dom";

//React-Toastify
import { toast } from "react-toastify";

//dotenv
require("dotenv").config();

const Signin = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = () => {
    axios({
      method: "POST",
      url: `${API}/auth/signin`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data?.user));
          localStorage.setItem("token", res.data?.token);

          toast.success(res.data?.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          history.push("/");
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

  const onSuccess = (googleData) => {
    axios({
      method: "POST",
      url: "http://localhost:8000/api/auth/google",
      data: {
        token: googleData.tokenId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data?.user));
          localStorage.setItem("token", res.data?.token);

          toast.success(res.data?.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          history.push("/");
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
    console.log("Err in google Signin");
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
            clientId={progress.env.GOOGLE_CLIENT_ID}
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
