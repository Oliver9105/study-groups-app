import React, { useState, useEffect } from "react";

function NewSchedule() {
  const [session, setSession] = useState({ partner: "", time: "" });
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:5000/sessions");
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="container">
      <h2>Schedule</h2>
    </div>
  );
}

export default NewSchedule;
