import React, { useReducer } from "react";
import { useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import useForm from "../useForm";
import axios from "../../axios";

const AddProjectForm = ({ addProject, user }) => {
  const { values, handleChange, handleSubmit } = useForm(login);

  function login() {
    addProject({ ...values, owner: user.user_id, members: [user.user_id] });
  }

  const getUserDetails = async (username) => {
    const jwt = await JSON.parse(localStorage.getItem("token"));
    await axios
      .get(`users/`, {
        params: { username: username },
        headers: { Authorization: "Bearer " + jwt.access },
      })
      .then((res) => {
        user = res.data;
        console.log(user);
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Project</h2>
      <Form.Group className="mb-1" controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          value={values.name}
        />
      </Form.Group>
      <Form.Group className="mb-4" controlId="formGroupDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="description"
          onChange={handleChange}
          value={values.description}
        />
      </Form.Group>

      <InputGroup className="mb-1">
        <FormControl
          placeholder="Enter username"
          aria-label="Enter username"
          aria-describedby="basic-addon2"
        />
        <Button
          variant="dark"
          id="button-addon2"
          onClick={() => getUserDetails("admin")}
        >
          Add
        </Button>
      </InputGroup>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddProjectForm;
