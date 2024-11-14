import { useState, useEffect } from "react";

function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/profiles")
      .then((response) => response.json())
      .then((data) => setProfiles(data));
  }, []);

  return (
    <div>
      <h2>Profiles</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>{profile.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
