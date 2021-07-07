import React from "react";
import { useEffect, useState } from "react";
import {
  Spinner,
  Card,
  Row,
  Col,
  Button,
  CardDeck,
  ListGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import AddProjectForm from "./Forms/AddProjectForm";
import ProjectTasksStatus from "./Charts/ProjectTasksStatus";

const Projects = ({ user }) => {
  const [projects, setProjects] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  const history = useHistory();

  const getProjects = async () => {
    try {
      const jwt = await JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(`projects/?user=${user.user_id}`, {
        headers: { Authorization: "Bearer " + jwt.access },
      });
      setProjects(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("Get Projects useEffect");
    if (!projects) {
      getProjects();
    } else {
      setLoaded(true);
    }
    console.log(projects);
  }, [projects, user.user_id, getProjects]);

  const handleClick = (project_id) => {
    console.log(project_id);
    history.push({
      pathname: `/project?${project_id}/tasks`,
    });
  };

  const addProject = async (values) => {
    console.log(values);
    const jwt = await JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        `projects/`,
        { ...values, owner: user.user_id },
        {
          headers: { Authorization: "Bearer " + jwt.access },
        }
      )
      .then((res) => {
        getProjects();
      })
      .catch((error) => console.log(error.response));
  };

  const deleteProject = async (projectid) => {
    const jwt = await JSON.parse(localStorage.getItem("token"));
    await axios.delete(`projects/${projectid}/`, {
      headers: { Authorization: "Bearer " + jwt.access },
    });
    getProjects();
  };

  if (isLoaded) {
    return (
      <Row>
        <Col sm={8}>
          <h1>Projects</h1>
          <CardDeck>
            {projects.map((i, index) => (
              <Card key={index} style={{ marginBottom: "10px" }}>
                <Card.Header as="h5" onClick={() => handleClick(i.id)}>
                  {i.name}
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col sm={4}>
                      <Card.Subtitle className="mb-2 text-muted">
                        Project Owner: {i.owner.username}
                      </Card.Subtitle>
                      <Card.Text>{i.description}</Card.Text>
                    </Col>

                    <Col sm={4}>
                      <Card.Subtitle className="mb-2 text-muted">
                        Team:
                      </Card.Subtitle>
                      <ListGroup>
                        {i.members.map((m, mi) => (
                          <ListGroup.Item key={mi}>{m.username}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                    <Col sm={4}>
                      <ProjectTasksStatus project_id={i.id} />
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col sm={10}></Col>
                    <Col sm={2}>
                      <Button
                        variant="danger"
                        onClick={() => deleteProject(i.id)}
                        size="sm"
                      >
                        Delete Project
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            ))}
          </CardDeck>
        </Col>
        <Col sm={4}>
          <AddProjectForm addProject={addProject} />
        </Col>
      </Row>
    );
  } else {
    return <Spinner animation="border" />;
  }
};

export default Projects;
