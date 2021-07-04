import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const Dashboard = () => {
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
    console.log(isLoaded);
  });

  if (isLoaded) {
    return <h1>Dashboard</h1>;
  } else {
    return <Spinner animation="border" />;
  }
};

export default Dashboard;
