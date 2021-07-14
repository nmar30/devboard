import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Notes from "./components/TaskNotes";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Container, Row } from "react-bootstrap";

const App = () => {
  //State
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    console.log("Token useEffect Ran");
    if (!user) {
      try {
        const jwt = localStorage.getItem("token");
        const user = jwtDecode(jwt);
        setUser(user);
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
        console.log("no token");
      }
    }
    console.log(user);
  }, [user]);

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
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute
            exact
            path="/dashboard"
            isAuthenticated={isAuthenticated}
            user={user}
            component={Dashboard}
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
