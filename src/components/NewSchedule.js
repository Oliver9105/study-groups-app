import React, { useState, useEffect } from "react";
import "../App.css";

function NewSchedule() {
  const [session, setSession] = useState({ partner: "", time: "" });
  const [sessions, setSessions] = useState([]);

  return (
    <div className="container">
      <h2>Schedule</h2>
    </div>
  );
}

export default NewSchedule;
