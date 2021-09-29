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

//To get user from localstorage
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../helper/storageOperations";

//Logout Google
import { GoogleLogout } from "react-google-login";
import { toast } from "react-toastify";

//Router
import { useLocation, useHistory } from "react-router-dom";
import { signOut } from "../helper/Calls/Auth";

const Menubar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState("");

  const location = useLocation();
  const history = useHistory();

  const toggleNavbar = () => setCollapsed(!collapsed);

  const logoutSuccess = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

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
  };

  const handelLogout = () => {
    signOut()
      .then(async () => {
        await removeItemFromLocalStorage("token");
        await removeItemFromLocalStorage("userId");
        await removeItemFromLocalStorage("user");

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
    const currentUser = getItemFromLocalStorage("user");
    if (currentUser) {
      setUser(currentUser);
    }
  }, [location]);
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
                      {user.recieveRequest.length}
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
                      {user.notifications.length}
                    </span>
                  </NavLink>
                </NavItem>
                {user.authType == "google" ? (
                  <NavItem className="my-3">
                    <GoogleLogout
                      clientId="163781510653-o7996ee5f0scidi1fdcdel6l868fffn5.apps.googleusercontent.com"
                      buttonText="Logout"
                      render={(renderProps) => (
                        <span
                          onClick={renderProps.onClick}
                          className="custom-button button-primary-color"
                        >
                          {" "}
                          LogOut{" "}
                        </span>
                      )}
                      onLogoutSuccess={logoutSuccess}
                    />
                  </NavItem>
                ) : (
                  <NavItem className="my-3">
                    <span
                      className="custom-button button-primary-color"
                      onClick={handelLogout}
                    >
                      Log Out
                    </span>
                  </NavItem>
                )}
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
