import React from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "../useForm";

const AddTaskForm = ({ addTask }) => {
  const { values, handleChange, handleSubmit } = useForm(submit);

  function submit() {
    addTask({ ...values });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add Task</h1>
      <Form.Group className="mb-1" controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          value={values.name}
        />
      </Form.Group>
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
      <Form.Group className="mb-1" controlId="exampleForm.ControlSelect1">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          onChange={handleChange}
          value={values.status}
        >
          <option></option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>On Hold</option>
          <option>Completed</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-1" controlId="formGroupName">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="start_date"
          placeholder=""
          onChange={handleChange}
          value={values.start_date}
        />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formGroupName">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="due_date"
          placeholder=""
          onChange={handleChange}
          value={values.due_date}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTaskForm;
