import React from "react";
import { useState, useEffect } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import useForm from "../useForm";
import axios from "../../axios";

const AddTaskNoteForm = ({ addTaskNote }) => {
  const { values, handleChange, handleSubmit } = useForm(submit);
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  function submit() {
    addTaskNote({ ...values });
  }

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        values.time_worked = computedMinute;
        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function resetTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
    values.time_worked = 0;
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
      {isActive && (
        <h3>
          Elapsed Time: {minute}:{second}
        </h3>
      )}
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text>Time Worked:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          placeholder="Minutes"
          name="time_worked"
          aria-label="Minutes"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={values.time_worked}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button variant="outline-secondary" onClick={() => resetTimer()}>
            Reset
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTaskNoteForm;
