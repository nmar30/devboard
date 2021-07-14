import React from "react";
import useForm from "./useForm";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "../axios";

const Login = ({ setAuthenticated }) => {
  const { values, handleChange, handleSubmit } = useForm(login);

  function login() {
    getToken(values);
  }

  const getToken = async (values) => {
    await axios
      .post(`auth/login/`, values)
      .then((response) =>
        localStorage.setItem("token", JSON.stringify(response.data))
      )
      .finally(() => (window.location.href = "/dashboard"))
      .catch((error) => console.log(error));
  };

  return (
    <Row>
      <Col sm={8}>Welcome Screen Image</Col>
      <Col sm={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              value={values.username}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={values.password}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
