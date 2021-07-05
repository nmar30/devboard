import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Spinner,
  Card,
  Row,
  Col,
  CardDeck,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import axios from "../axios";
import AddTaskForm from "./Forms/AddTaskForm";

const Tasks = ({
  user,
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

  const getTasks = async () => {
    try {
      const jwt = await JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(`projects/${project_id}/tasks/`, {
        headers: { Authorization: "Bearer " + jwt.access },
      });
      setTasks(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("Get Tasks useEffect");
    if (!tasks) {
      getTasks();
    } else {
      setLoaded(true);
    }
    console.log(tasks);
  }, [getTasks, tasks]);

  const addTask = async (values) => {
    console.log(values);
    console.log(user);
    const jwt = await JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        `projects/${project_id}/tasks/`,
        { ...values, project: project_id, owner: user.user_id },
        {
          headers: { Authorization: "Bearer " + jwt.access },
        }
      )
      .then((res) => {
        getTasks();
      })
      .catch((error) => console.log(error.response));
  };

  const deleteTask = async (taskid) => {
    const jwt = await JSON.parse(localStorage.getItem("token"));
    await axios.delete(`projects/${project_id}/tasks/${taskid}/`, {
      headers: { Authorization: "Bearer " + jwt.access },
    });
    getTasks();
  };

  const updateTaskStatus = async (taskid, status) => {
    const jwt = await JSON.parse(localStorage.getItem("token"));
    axios
      .patch(
        `projects/${project_id}/tasks/${taskid}/`,
        { status: status },
        {
          headers: { Authorization: "Bearer " + jwt.access },
        }
      )
      .then((response) => {
        console.log(response.data);
        getTasks();
      });
  };

  if (isLoaded) {
    return (
      <Row>
        <Col sm={8}>
          <h1>Tasks</h1>
          <Row>
            <CardDeck>
              {tasks.map((i, index) => (
                <Card key={index} style={{ marginBottom: "5px" }}>
                  <Card.Header>
                    <Row>
                      <Col sm={8}>Status: {i.status}</Col>
                      <Col sm={4}>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title="Update Status"
                          size="sm"
                        >
                          <Dropdown.Item
                            onClick={() =>
                              updateTaskStatus(i.id, "Not Started")
                            }
                          >
                            Not Started
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              updateTaskStatus(i.id, "In Progress")
                            }
                          >
                            In Progress
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => updateTaskStatus(i.id, "On Hold")}
                          >
                            On Hold
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => updateTaskStatus(i.id, "Completed")}
                          >
                            Completed
                          </Dropdown.Item>
                        </DropdownButton>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title onClick={() => handleClick(i.id)}>
                      {i.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <Card.Text className="justify-content-end">
                      Due Date: {i.due_date}
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    <Row>
                      <Col sm={8}>
                        <small className="text-muted">
                          Task Owner: {i.owner.username}
                        </small>
                      </Col>
                      <Col sm={4}>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteTask(i.id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              ))}
            </CardDeck>
          </Row>
        </Col>
        <Col sm={4}>
          <AddTaskForm addTask={addTask} />
        </Col>
      </Row>
    );
  } else {
    return <Spinner animation="border" />;
  }
};

export default Tasks;
