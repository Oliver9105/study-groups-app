import React, { useState, useEffect } from "react";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/subjects");
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleAddSubject = async () => {
    if (
      newSubject &&
      !subjects.some((subject) => subject.name === newSubject)
    ) {
      try {
        const response = await fetch("http://localhost:5000/subjects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: subjects.length + 1, name: newSubject }),
        });
        if (response.ok) {
          const addedSubject = await response.json();
          setSubjects([...subjects, addedSubject]);
          setNewSubject("");
        } else {
          console.error("Failed to add subject");
        }
      } catch (error) {
        console.error("Error adding subject:", error);
      }
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

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
        <button onClick={handleAddSubject}>Add Subject</button>
      </div>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Subjects;
