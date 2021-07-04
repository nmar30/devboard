import React from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import useForm from "../useForm";
import axios from "../../axios";
import { useState } from "react";

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
      <Form.Group className="mb-1" controlId="formGroupName">
        <Form.Label>Start Date/Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="start_time"
          placeholder=""
          onChange={handleChange}
          value={values.start_time}
        />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formGroupName">
        <Form.Label>End Date/Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="end_time"
          placeholder=""
          onChange={handleChange}
          value={values.end_time}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTaskNoteForm;
