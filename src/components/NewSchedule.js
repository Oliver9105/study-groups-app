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
  const handleSchedule = async () => {
    try {
      const response = await fetch("http://localhost:5000/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });
      if (response.ok) {
        const newSession = await response.json();
        setSessions((prevSessions) => [...prevSessions, newSession]);
      } else {
        console.error("Failed to schedule session");
      }
    } catch (error) {
      console.error("Error scheduling session:", error);
    }
  };

  return (
    <div className="container">
      <h2>Schedule</h2>
    </div>
  );
}

export default NewSchedule;
