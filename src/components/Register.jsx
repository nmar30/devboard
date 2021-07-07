import React from "react";
import { useHistory } from "react-router";
import useForm from "./useForm";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "../axios";

const Register = (props) => {
  const { values, handleChange, handleSubmit } = useForm(register);

  function register() {
    axios
      .post(`auth/register/`, values)
      .then((res) => {
        console.log(res.data);
        history.push({
          pathname: `/login`,
        });
      })
      .catch((error) => console.log(error.response));
  }

  const history = useHistory();

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
          <Form.Group controlId="formGroupUsername">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={values.email}
            />
          </Form.Group>
          <Form.Group controlId="formGroupUsername">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              onChange={handleChange}
              value={values.first_name}
            />
          </Form.Group>
          <Form.Group controlId="formGroupUsername">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="last_name"
              placeholder="Enter First Name"
              onChange={handleChange}
              value={values.last_name}
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

export default Register;
