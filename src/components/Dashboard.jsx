import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner, Row, Col, ListGroup } from "react-bootstrap";
import axios from "../axios";

const Dashboard = ({ user }) => {
  const [taskList, setTaskList] = useState(null);
  const [projectList, setProjectList] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const jwt = await JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(`data/tasks/?user=${user.user_id}`, {
          headers: { Authorization: "Bearer " + jwt.access },
        });
        setTaskList(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    const getUserProjects = async () => {
      try {
        const jwt = await JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `data/projects/?user=${user.user_id}`,
          {
            headers: { Authorization: "Bearer " + jwt.access },
          }
        );
        setProjectList(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (!taskList || !projectList) {
      getUserTasks();
      getUserProjects();
    } else {
      setLoaded(true);
    }
    console.log(isLoaded);
  }, [isLoaded, taskList, projectList, user.user_id]);

  if (isLoaded) {
    return (
      <Row>
        <h1>Dashboard</h1>
        <Col>
          <h2>My Tasks</h2>
          <ListGroup>
            {taskList.map((i, index) => (
              <ListGroup.Item key={index}>
                {i.name} | {i.status}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h2>My Projects</h2>
          <ListGroup>
            {projectList.map((i, index) => (
              <ListGroup.Item key={index}>{i.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  } else {
    return <Spinner animation="border" />;
  }
};

export default Dashboard;
