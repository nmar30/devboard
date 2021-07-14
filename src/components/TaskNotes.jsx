import React from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Spinner, Card, Row, Col, CardDeck, Button } from "react-bootstrap";
import axios from "../axios";
import AddTaskNoteForm from "./Forms/AddTaskNoteForm";

const TaskNotes = ({
  user,
  match: {
    params: { project_id, task_id },
  },
}) => {
  const [notes, setNotes] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  const getTaskNotes = useCallback(async () => {
    try {
      const jwt = await JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `projects/${project_id}/tasks/${task_id}/notes/`,
        {
          headers: { Authorization: "Bearer " + jwt.access },
        }
      );
      setNotes(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [project_id, task_id]);

  useEffect(() => {
    console.log("Get Notes useEffect");
    if (!notes) {
      getTaskNotes();
    } else {
      setLoaded(true);
    }
    console.log(notes);
  }, [notes, getTaskNotes]);

  const addTaskNote = async (values) => {
    console.log(values);
    const jwt = await JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        `projects/${project_id}/tasks/${task_id}/notes/`,
        { ...values, task: task_id, owner: user.user_id },
        {
          headers: { Authorization: "Bearer " + jwt.access },
        }
      )
      .then((res) => {
        getTaskNotes();
      })
      .catch((error) => console.log(error.response));
  };

  const deleteTaskNotes = async (tasknoteid) => {
    console.log(tasknoteid);
    const jwt = await JSON.parse(localStorage.getItem("token"));
    await axios.delete(
      `projects/${project_id}/tasks/${task_id}/notes/${tasknoteid}/`,
      {
        headers: { Authorization: "Bearer " + jwt.access },
      }
    );
    getTaskNotes();
  };

  if (isLoaded) {
    return (
      <Row>
        <Col sm={8}>
          <h1>Notes</h1>
          <Row>
            <CardDeck>
              {notes.map((i, index) => (
                <Card key={index} style={{ marginBottom: "5px" }}>
                  <Card.Header>
                    <Row>
                      <Col sm={9}>Date Worked: {i.date_worked}</Col>
                      <Col sm={3}>Time Worked: {i.time_worked} Min</Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Subtitle>Description</Card.Subtitle>
                    <Card.Text>{i.description}</Card.Text>
                    <Card.Subtitle>Resources:</Card.Subtitle>
                    <Card.Text> {i.resources}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => deleteTaskNotes(i.id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Submitted By: {i.owner.username}
                    </small>
                  </Card.Footer>
                </Card>
              ))}
            </CardDeck>
          </Row>
        </Col>
        <Col sm={4}>
          <AddTaskNoteForm addTaskNote={addTaskNote} />
        </Col>
      </Row>
    );
  } else {
    return <Spinner animation="border" />;
  }
};

export default TaskNotes;
