import { useState } from "react";
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

const Menubar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="container">
      <Navbar color="blue" light className="menu-bar">
        <NavbarBrand href="/" className="mr-auto">
          <h1 className="branding">SnapTalk</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="requests">Requests</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="profile">My Profile</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="notification">Notification</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="signin" className="btn btn-danger">
                Log Out
              </NavLink>
            </NavItem>

            {/* <NavItem>
              <NavLink href="signin">Signin / Signup</NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Menubar;
