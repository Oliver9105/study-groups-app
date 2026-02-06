import React from 'react';
import { useNavigate } from 'react-router-dom';

function GroupCard({ group, onJoin }) {
  const navigate = useNavigate();
  
  const handleCardClick = (e) => {
    // Don't navigate if clicking the join button
    if (e.target.closest('.btn-join')) return;
    navigate(`/group/${group.id}`);
  };

  return (
    <div className="group-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="card-header">
        <span className={`badge ${group.subject.toLowerCase()}`}>
          {group.subject}
        </span>
        <div className="members">👤 {group.members}</div>
      </div>
      <h4>{group.title}</h4>
      <p>{group.description}</p>
      <button 
        className={`btn-join ${group.joined ? 'joined' : ''}`}
        onClick={() => onJoin(group.id)}
      >
        {group.joined ? '✓ Joined' : 'Join Group'}
      </button>
    </div>
  );
}

export default GroupCard;