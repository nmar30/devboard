import React from "react";
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

  const getTaskNotes = async () => {
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
  };

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
                  <Card.Body>
                    <Card.Title>{i.description}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <Card.Text> {i.resources}</Card.Text>
                    <Card.Text>Start Time: {i.start_time}</Card.Text>
                    <Card.Text>End Time: {i.end_time}</Card.Text>
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
