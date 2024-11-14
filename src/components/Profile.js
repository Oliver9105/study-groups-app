import { useState, useEffect } from "react";

function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name || !availability) {
      setError("Please fill out both fields.");
      return;
    }

    setError("");

    setProfiles([...profiles, { id: profiles.length + 1, name, availability }]);
    setName("");
    setAvailability("");
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
