import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Projects from "./components/Projects";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "./axios";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  //State
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Use Effect Ran");
    const jwt = localStorage.getItem("token");
    try {
      const user = jwtDecode(jwt);
      setUser(user);
    } catch {
      console.log("no token");
    }
  }, []);

  const getToken = async (values) => {
    try {
      async function postData() {
        const response = await axios.post(`auth/login/`, values);
        localStorage.setItem("token", JSON.stringify(response.data));
      }
      await postData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Row>
        <NavBar user={user} />
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
            user={user}
            component={Profile}
          />
          <ProtectedRoute
            exact
            path="/projects"
            user={user}
            component={Projects}
          />
          <Route exact path="/unauthorized" component={Unauthorized} />
        </Switch>
      </Row>
    </Container>
  );
};

export default App;
