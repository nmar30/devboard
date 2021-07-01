import React from "react";
import {
  BrowserRouter as Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "./axios";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  //State
  const [user, setUser] = useState(null);

  useEffect(() => {
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
        setUser(localStorage.getItem("token"));
        console.log();
      }
      await postData();
      window.location.reload();
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
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            render={(props) => <Login {...props} getToken={getToken} />}
          />
          <Route
            path="/profile"
            render={(props) => {
              console.log(user);
              if (!user) {
                return <Redirect to="/login" />;
              } else {
                return <Profile {...props} user={user} />;
              }
            }}
          />
        </Switch>
      </Row>
    </Container>
  );
};

export default App;
