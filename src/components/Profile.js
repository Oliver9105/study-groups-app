import React, { useState, useEffect } from "react";
import "../App.css";

function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [availability, setAvailability] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  const fetchSubjects = async () => {
    try {
      const response = await fetch(
        "https://studygroups-json-server-1.onrender.com/subjects"
      );
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await fetch(
        "https://studygroups-json-server-1.onrender.com/profiles"
      );
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch(
        "https://studygroups-json-server-1.onrender.com/groups"
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching groups:", error);
      return [];
    }
  };

  const handleSave = async () => {
    if (!name || !selectedSubjects.length || !availability) {
      setError("All fields are required.");
      return;
    }
    setError("");
    const newProfile = { name, subjects: selectedSubjects, availability };
    try {
      const response = await fetch(
        "https://studygroups-json-server-1.onrender.com/profiles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProfile),
        }
      );

      if (response.ok) {
        const addedProfile = await response.json();
        setProfiles([...profiles, addedProfile]);
        setName("");
        setSelectedSubjects([]);
        setAvailability("");

        console.log("Profile added:", addedProfile);
        await addToGroups(addedProfile);

        console.log("Profile saved and added to group");
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const addToGroups = async (profile) => {
    try {
      const groups = await fetchGroups();
      profile.subjects.forEach(async (subject) => {
        let group = groups.find(
          (g) =>
            g.category === subject && g.availability === profile.availability
        );
        if (!group) {
          const newGroup = {
            name: `${subject} Group ${profile.availability}`,
            category: subject,
            availability: profile.availability,
            members: [profile],
          };
          const groupResponse = await fetch(
            "https://studygroups-json-server-1.onrender.com/groups",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newGroup),
            }
          );
          group = await groupResponse.json();
          console.log("New group created:", group);
        } else {
          group.members.push(profile);
          await fetch(
            `https://studygroups-json-server-1.onrender.com/groups/${group.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(group),
            }
          );
          console.log("Profile added to existing group:", group);
        }
      });
    } catch (error) {
      console.error("Error adding profile to groups:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
    fetchSubjects();
  }, []);

  const handleSubjectChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSubjects(value);
  };

  return (
    <div className="container">
      <h2>Profiles</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Subjects:
          <select
            multiple
            value={selectedSubjects}
            onChange={handleSubjectChange}
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Availability:
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSave}>Save Profile</button>

      <h3>Existing Profiles:</h3>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.name} - Subjects: {profile.subjects.join(", ")} -
            Availability: {profile.availability}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
