import { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

//Css
import "../css/menubar.component.css";

import { toast } from "react-toastify";

//Router
import { useLocation, useHistory } from "react-router-dom";
import { signOut } from "../helper/Calls/Auth";

const Menubar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState("");
  const [userfollowers, setUserFollowers] = useState("");

  const location = useLocation();
  const history = useHistory();

  const toggleNavbar = () => setCollapsed(!collapsed);

  const handelLogout = () => {
    signOut()
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        setUser("");

        toast.success("SignOut Successful!", {
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
        console.log(err);

        toast.error("Please Try Again!", {
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

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const followers = JSON.parse(localStorage.getItem("followers"));
    if (currentUser) {
      setUser(currentUser);
      setUserFollowers(followers);
    }
  }, [user, location]);
  return (
    <div className="container">
      <Navbar color="blue" light className="menu-bar">
        <NavbarBrand href="/" className="mr-auto">
          <h1 className="branding">SnapTalk</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {user ? (
              <>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/post">Add Post</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/discover">Discover</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="requests">
                    Requests{" "}
                    <span className="bg-dark px-2 py-1 text-white rounded mx-1">
                      {userfollowers?.recieveRequest.length}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="profile">My Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="notification">
                    Notification
                    <span className="bg-dark px-2 py-1 text-white rounded mx-1">
                      {user?.notifications.length}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem className="my-3">
                  <span
                    className="custom-button button-primary-color"
                    onClick={handelLogout}
                  >
                    Log Out
                  </span>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink href="signin">Signin / Signup</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Menubar;
