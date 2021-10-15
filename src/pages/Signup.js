import React, { useState } from "react";

//Css
import "../css/global.css";
import "../css/signin.css";

//Reactstrap
import { Form, FormGroup, Input, Label, Button, Spinner } from "reactstrap";

//Router
import { Link } from "react-router-dom";

//API
import { API } from "../helper/API";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handelSubmit = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: `${API}/auth/signup`,
      data: {
        name: name,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        setLoading(false);
        toast.success("Signup Success!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/signin");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed To Signup!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="base-div">
      <div className="container base-container ">
        <h3 style={{ textAlign: "center" }}>SignUp</h3>

        <div className="input-div">
          <Form>
            <FormGroup style={{ marginTop: "10px" }}>
              <Label>Name</Label>

              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup style={{ marginTop: "10px" }}>
              <Label>Email</Label>
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup style={{ marginTop: "10px" }}>
              <Label>Password</Label>

              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup style={{ marginTop: "10px" }}>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <Button className="buttons" onClick={handelSubmit}>
              {loading ? <Spinner> </Spinner> : "Submit"}
            </Button>
          </Form>

          <p style={{ marginTop: "10px" }}>
            {" "}
            Already have an account? <Link to="signin">Signin</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
