import React from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import useForm from "../useForm";
import axios from "../../axios";
import { useState } from "react";

const AddProjectForm = ({ addProject }) => {
  const { values, handleChange, handleSubmit } = useForm(submit);
  const [addMember, setAddMember] = useState();
  const [members, setMembers] = useState([]);
  const [membersId, setMembersId] = useState([]);

  function submit() {
    addProject({ ...values, members: membersId });
  }

  const getUserDetails = async (username) => {
    const jwt = await JSON.parse(localStorage.getItem("token"));
    const response = await axios
      .get(`users/`, {
        params: { username: username },
        headers: { Authorization: "Bearer " + jwt.access },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error.response));
    return await response;
  };

  const handleAddMember = async (username) => {
    const memberjson = await getUserDetails(username);
    setMembers([...members, memberjson]);
    setMembersId([...membersId, memberjson.id]);
  };

  const handleRemoveMember = () => {
    if (members.length > 0) {
      const lastIndex = members.length - 1;
      setMembers(members.filter((member, index) => index !== lastIndex));
      setMembersId(membersId.filter((memberId, index) => index !== lastIndex));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Project</h2>
      <Form.Group className="mb-1" controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          value={values.name}
        />
      </Form.Group>
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
      <Form.Label>Members</Form.Label>
      <ListGroup className="mb-2">
        {members &&
          members.map((item, index) => (
            <ListGroup.Item key={index} action onClick={handleRemoveMember}>
              {item.username}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter username"
          aria-label="Enter username"
          aria-describedby="basic-addon2"
          value={addMember}
          onChange={(e) => setAddMember(e.target.value)}
        />
        <Button
          variant="dark"
          id="button-addon2"
          onClick={() => handleAddMember(addMember)}
        >
          Add Member
        </Button>
      </InputGroup>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddProjectForm;
