import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = ({ user, logout }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/dashboard">
        devBoard
      </Navbar.Brand>
      <Nav className="mr-auto">
        {user && (
          <React.Fragment>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/projects">
              Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </React.Fragment>
        )}
      </Nav>
      {user && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Hello {user.first_name}</Navbar.Text>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default NavBar;
