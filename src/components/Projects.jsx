import React from "react";
import { useEffect, useState } from "react";
import { Spinner, Card, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import AddProjectForm from "./Forms/AddProjectForm";

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
          <Row>
            {projects.map((i, index) => (
              <Card key={index} style={{ width: "95%", marginBottom: "10px" }}>
                <Card.Body>
                  <Card.Title onClick={() => handleClick(i.id)}>
                    {i.name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Project Owner: {i.owner.username}
                  </Card.Subtitle>
                  <Card.Text>{i.description}</Card.Text>
                  <Button variant="danger" onClick={() => deleteProject(i.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
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
