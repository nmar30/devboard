import React from "react";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "../../axios";

const ProjectTasksStatus = ({ project_id }) => {
  const [dataArray, setDataArray] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      const jwt = await JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`projects/${project_id}/tasks/`, {
          headers: { Authorization: "Bearer " + jwt.access },
        })
        .then((response) => {
          response = response.data;
          let notstarted = 0;
          let inprogress = 0;
          let onhold = 0;
          let completed = 0;
          for (var i = 0; i < response.length; i++) {
            var task = response[i];
            if (task.status === "Not Started") {
              notstarted = notstarted + 1;
            } else if (task.status === "In Progress") {
              inprogress = inprogress + 1;
            } else if (task.status === "On Hold") {
              onhold = onhold + 1;
            } else if (task.status === "Completed") {
              completed = completed + 1;
            }
            const array = [notstarted, inprogress, onhold, completed];
            setDataArray(array);
          }
        });
    };
    getTasks();
  }, [project_id]);

  const data = {
    labels: ["Not Started", "In Progress", "On Hold", "Completed"],
    datasets: [
      {
        label: "# of Votes",
        data: dataArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default ProjectTasksStatus;
