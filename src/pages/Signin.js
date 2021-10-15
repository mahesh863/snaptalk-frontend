import React, { useState } from "react";

//Css
import "../css/global.css";
import "../css/signin.css";

//Social Login
import GoogleLogin from "react-google-login";

//Reactstrap
import { Form, FormGroup, Input, Label, Button, Spinner } from "reactstrap";

//Router
import { Link } from "react-router-dom";

//React-Toastify
import { toast } from "react-toastify";

//Helpers
import { emailSignin, googleSignin } from "../helper/Calls/Auth";

//Get Profile Helper
import { getProfile } from "../helper/Calls/MyProfile";

//dotenv
require("dotenv").config();

const Signin = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handelSubmit = () => {
    setLoading(true);
    emailSignin(email, password)
      .then((res) => {
        console.log(res.data);
        setLoading(false);

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
        setLoading(false);

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
            {loading ? <Spinner> </Spinner> : "Submit"}
          </Button>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <Link to="signup">Signup</Link>
          </p>
        </div>
        <div className="border p-2">
          <p>Test Login Details:</p>
          <div className="my-2">
            <p style={{ fontWeight: "bold" }}>Email: testuser@snaptalk.com</p>
            <p style={{ fontWeight: "bold" }}>Password: Password@123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
