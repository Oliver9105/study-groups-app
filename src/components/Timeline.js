import React from 'react';

function Timeline({ sessions }) {
  if (sessions.length === 0) {
    return (
      <div className="timeline">
        <p className="text-muted text-center">No sessions scheduled</p>
      </div>
    );
  }

  return (
    <div className="timeline">
      {sessions.map(session => (
        <div key={session.id} className="timeline-item">
          <div className="time">{session.time}</div>
          <div className="session-card">
            <span className={`badge ${session.subject.toLowerCase()}`}>
              {session.subject}
            </span>
            <h4>{session.title}</h4>
            <p>{session.location} • {session.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;