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
import Notification from "./pages/Notification";
import AddPost from "./pages/AddPost";
import Discover from "./pages/Discover";
import ViewProfile from "./pages/ViewProfile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Menubar />
      {/* Setting up router components  */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/notification" component={Notification} />
        <Route exact path="/profile" component={MyProfile} />
        <Route exact path="/requests" component={Requests} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/post" component={AddPost} />
        <Route exact path="/view/:userId" component={ViewProfile} />
        <Route exact path="/followers" component={Followers} />
        <Route exact path="/following" component={Following} />
      </Switch>
    </Router>
  );
};

export default App;
