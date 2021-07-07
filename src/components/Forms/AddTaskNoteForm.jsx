import React from "react";
import { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import useForm from "../useForm";
import axios from "../../axios";
import Timer from "../Timer/Timer";

const AddTaskNoteForm = ({ addTaskNote }) => {
  const { values, handleChange, handleSubmit } = useForm(submit);

  function submit() {
    addTaskNote({ ...values });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add Task Note</h1>
      <Form.Group className="mb-1" controlId="formGroupDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="description"
          onChange={handleChange}
          value={values.description}
        />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formGroupDescription">
        <Form.Label>Resources</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="resources"
          onChange={handleChange}
          value={values.resources}
        />
      </Form.Group>
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text>Date Worked:</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="date"
          name="date_worked"
          placeholder="Enter Date"
          onChange={handleChange}
          value={values.date_worked}
        />
      </InputGroup>
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text>Time Worked:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Enter Time"
          aria-label="Enter Time"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={values.time_worked}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Start</Button>
          <Button variant="outline-secondary">Reset</Button>
        </InputGroup.Append>
      </InputGroup>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTaskNoteForm;
