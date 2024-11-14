import { useState, useEffect } from "react";

function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSave = () => {
    if (!name || !availability || selectedSubjects.length === 0) {
      setError("Please fill out all fields and select at least one subject.");
      return;
    }

    setError("");

    setProfiles([
      ...profiles,
      {
        id: profiles.length + 1,
        name,
        availability,
        subjects: selectedSubjects,
      },
    ]);
    setName("");
    setAvailability("");
    setSelectedSubjects([]);
  };

  useEffect(() => {
    fetch("http://localhost:5000/profiles")
      .then((response) => response.json())
      .then((data) => setProfiles(data));
  }, []);

  return (
    <div>
      <h2>Profiles</h2>
      {error && <div className="error">{error}</div>}

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
          Availability:
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Subjects:
          <select
            multiple
            value={selectedSubjects}
            onChange={(e) =>
              setSelectedSubjects(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="English">English</option>
          </select>
        </label>
      </div>
      {selectedSubjects.length > 0 && (
        <div>
          <h4>Selected Subjects:</h4>
          <ul>
            {selectedSubjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleSave}>Save Profile</button>

      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>{profile.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
