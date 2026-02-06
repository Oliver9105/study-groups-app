import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { state } = useApp();

  return (
    <div className="groups-dashboard">
      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">👥</div>
          <div className="stat-content">
            <div className="stat-label">Study Groups</div>
            <div className="stat-number-dash">{state.studyGroups.length}</div>
          </div>
        </div>
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">📅</div>
          <div className="stat-content">
            <div className="stat-label">Scheduled Sessions</div>
            <div className="stat-number-dash">{state.sessions.length}</div>
          </div>
        </div>
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">📚</div>
          <div className="stat-content">
            <div className="stat-label">My Subjects</div>
            <div className="stat-number-dash">{state.user.subjects.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>My Study Groups</h3>
          {state.studyGroups.length > 0 ? (
            <div className="groups-grid-dashboard">
              {state.studyGroups.map(group => (
                <div key={group.id} className="group-card-dashboard">
                  <div className="group-header">
                    <div className="group-avatar">
                      <img src="/api/placeholder/40/40" alt={`${group.name} group`} className="avatar-img" />
                    </div>
                    <div className="group-info">
                      <h4>{group.name}</h4>
                      <p>{group.description}</p>
                    </div>
                  </div>
                  <div className="group-actions">
                    <Link to={`/group/${group.id}`} className="btn-view-details">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-sessions">
              <p>You haven't joined any study groups yet.</p>
              <Link to="/groups" className="btn-join-group">Browse Groups</Link>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h3>Upcoming Sessions</h3>
          {state.sessions.length > 0 ? (
            <div className="sessions-timeline">
              {state.sessions.map(session => {
                const group = state.studyGroups.find(g => g.id === session.groupId);
                return (
                  <div key={session.id} className="timeline-item">
                    <div className="timeline-dot active"></div>
                    <div className="session-info">
                      <h4>{session.title}</h4>
                      {group && <p>{group.name}</p>}
                      <p>{session.date} at {session.time}</p>
                      <p>{session.duration} • {session.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-sessions">
              <p>No upcoming sessions scheduled.</p>
              <Link to="/schedule" className="btn-join-group">Schedule Session</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
