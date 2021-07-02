import React from "react";
import { useEffect, useState } from "react";
import { Spinner, Card } from "react-bootstrap";
import axios from "../axios";

const Projects = ({ user }) => {
  const [projects, setProjects] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("Get Projects useEffect");
    if (!projects) {
      const getProjects = async () => {
        try {
          const jwt = await JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(`projects/`, {
            headers: { Authorization: "Bearer " + jwt.access },
          });
          setProjects(response.data);
          setLoaded(true);
        } catch (e) {
          console.log(e);
        }
      };
      getProjects();
    }
    console.log(projects);
  }, [projects]);
  if (isLoaded) {
    return (
      <div>
        <h1>Projects</h1>

        <ul>
          {projects.map((i) => (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{i.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Project Owner: {i.owner.username}
                </Card.Subtitle>
                <Card.Text>{i.description}</Card.Text>
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

export default Projects;
