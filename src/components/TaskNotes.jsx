import React from "react";
import { useEffect, useState } from "react";
import { Spinner, Card } from "react-bootstrap";
import axios from "../axios";

const Notes = ({
  match: {
    params: { project_id, task_id },
  },
}) => {
  const [notes, setNotes] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("Get Notes useEffect");
    console.log(project_id, task_id);
    if (!notes) {
      const getNotes = async () => {
        try {
          const jwt = await JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(
            `projects/${project_id}/tasks/${task_id}/notes/`,
            {
              headers: { Authorization: "Bearer " + jwt.access },
            }
          );
          setNotes(response.data);
          setLoaded(true);
        } catch (e) {
          console.log(e);
        }
      };
      getNotes();
    }
    console.log(notes);
  }, [project_id, task_id, notes]);
  if (isLoaded) {
    return (
      <div>
        <h1>Notes</h1>

        <ul>
          {notes.map((i) => (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{i.description}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Submitted By: {i.owner.username}
                </Card.Subtitle>
                <Card.Text>Start Time: {i.start_time}</Card.Text>
                <Card.Text>End Time: {i.end_time}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Spinner animation="border" />;
  }
};

export default Notes;
