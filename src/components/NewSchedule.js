import React, { useState, useEffect } from "react";

function NewSchedule() {
  const [session, setSession] = useState({ partner: "", time: "" });
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          "https://studygroups-json-server-1.onrender.com/sessions"
        );
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
      const response = await fetch(
        "https://studygroups-json-server-1.onrender.com/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session),
        }
      );
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://studygroups-json-server-1.onrender.com/sessions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setSessions(sessions.filter((session) => session.id !== id));
      } else {
        console.error("Failed to delete session");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="container">
      <h2>Schedule</h2>

      <div>
        <label>
          Study Partner:
          <input
            type="text"
            value={session.partner}
            onChange={(e) =>
              setSession({ ...session, partner: e.target.value })
            }
          />
        </label>
      </div>

      <div>
        <label>
          Time:
          <input
            type="text"
            value={session.time}
            onChange={(e) => setSession({ ...session, time: e.target.value })}
          />
        </label>
      </div>

      <button onClick={handleSchedule}>Schedule Session</button>

      <ul>
        {sessions.length > 0 ? (
          sessions.map((s) => (
            <li key={s.id}>
              {s.partner} - {s.time}
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No sessions scheduled</li>
        )}
      </ul>
    </div>
  );
}

export default NewSchedule;
