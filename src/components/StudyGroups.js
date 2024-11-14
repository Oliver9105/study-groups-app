import React, { useState, useEffect } from "react";

function StudyGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:5000/groups");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="container">
      <h2>Study Groups</h2>
      
  );
}

export default StudyGroups;
