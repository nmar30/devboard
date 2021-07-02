import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Notes from "./components/TaskNotes";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "./axios";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  //State
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Token useEffect Ran");
    if (!user) {
      try {
        const jwt = localStorage.getItem("token");
        const user = jwtDecode(jwt);
        setUser(user);
        setAuthenticated(true);
      } catch {
        console.log("no token");
      }
    }
    console.log(user);
  }, [user]);

  const getToken = async (values) => {
    try {
      const response = await axios.post(`auth/login/`, values);
      localStorage.setItem("token", JSON.stringify(response.data));
    } catch (e) {
      console.log(e);
    } finally {
      window.location.href = "/";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <Container>
      <Row>
        <NavBar user={user} logout={logout} />
      </Row>
      <Row>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/login"
            render={(props) => <Login {...props} getToken={getToken} />}
          />
          <ProtectedRoute
            exact
            path="/profile"
            isAuthenticated={isAuthenticated}
            user={user}
            component={Profile}
          />
          <ProtectedRoute
            exact
            path="/projects"
            isAuthenticated={isAuthenticated}
            user={user}
            component={Projects}
          />
          <ProtectedRoute
            exact
            path="/project?:project_id/tasks"
            isAuthenticated={isAuthenticated}
            user={user}
            component={Tasks}
            id
          />
          <ProtectedRoute
            exact
            path="/project?:project_id/task?:task_id/notes"
            isAuthenticated={isAuthenticated}
            user={user}
            component={Notes}
            id
          />
          <Route exact path="/unauthorized" component={Unauthorized} />
        </Switch>
      </Row>
    </Container>
  );
};

export default App;
