import React, { useState, useEffect } from "react";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");

  return (
    <div className="container">
      <h2>Subjects</h2>
      <div>
        <label>
          Add New Subject:
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
        </label>
        <button>Add Subject</button>
      </div>
    </div>
  );
}

export default Subjects;
