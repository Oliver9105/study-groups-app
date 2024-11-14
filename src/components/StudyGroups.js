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
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <h3>{group.name}</h3>
            <p>Members:</p>
            <ul>
              {group.members.length > 0 ? (
                group.members.map((member) => (
                  <li key={member.id}>
                    {member.name} - Subjects: {member.subjects.join(", ")} -
                    Availability: {member.availability}
                  </li>
                ))
              ) : (
                <li>No members in this group</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudyGroups;
