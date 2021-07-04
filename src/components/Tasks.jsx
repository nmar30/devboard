import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Spinner, Card } from "react-bootstrap";
import axios from "../axios";

const Tasks = ({
  match: {
    params: { project_id },
  },
}) => {
  const [tasks, setTasks] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  const history = useHistory();

  const handleClick = (task_id) => {
    console.log(task_id);
    history.push({
      pathname: `/project?${project_id}/task?${task_id}/notes`,
    });
  };

  useEffect(() => {
    console.log("Get Tasks useEffect");
    if (!tasks) {
      const getTasks = async () => {
        try {
          const jwt = await JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(`projects/${project_id}/tasks/`, {
            headers: { Authorization: "Bearer " + jwt.access },
          });
          setTasks(response.data);
          setLoaded(true);
        } catch (e) {
          console.log(e);
        }
      };
      getTasks();
    }
    console.log(tasks);
  }, [tasks, project_id]);
  if (isLoaded) {
    return (
      <div>
        <h1>Tasks</h1>

        <ul>
          {tasks.map((i) => (
            <Card style={{ width: "18rem" }} onClick={() => handleClick(i.id)}>
              <Card.Body>
                <Card.Title>{i.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Task Owner: {i.owner.username}
                </Card.Subtitle>
                <Card.Text>Status: {i.status}</Card.Text>
                <Card.Text>Due Date: {i.due_date}</Card.Text>
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

export default Tasks;
