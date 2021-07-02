import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">devBoard</Navbar.Brand>
      <Nav className="mr-auto">
        {!user && (
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        )}
        {user && (
          <React.Fragment>
            <Nav.Link as={Link} to="/">
              Home
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
