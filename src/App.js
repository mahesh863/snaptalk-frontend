import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.css";

//React-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Css
import "./css/global.css";

//Components
import Menubar from "./components/Menubar";

//Pages
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Requests from "./pages/Requests";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Menubar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/notification" component={Notification} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/requests" component={Requests} />
      </Switch>
    </Router>
  );
};

export default App;
