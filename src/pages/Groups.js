import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { initialGroups } from '../mockData';

function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState(initialGroups);
  const [showNotification, setShowNotification] = useState(true);

  const toggleJoin = (id) => {
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === id ? { ...group, joined: !group.joined } : group
      )
    );
  };

  const handleCardClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  const availableGroups = groups.filter(g => !g.joined);

  return (
    <div className="groups-dashboard">
      {/* Session Notification */}
      {showNotification && (
        <div className="session-notification">
          <div className="notification-content">
            <div className="notification-icon">🔔</div>
            <div className="notification-text">
              <strong>Session Starting Soon!</strong>
              <br />
              'JavaScript Async/Await Workshop' begins 5.5 minutes. Don't be late!
            </div>
          </div>
          <div className="notification-actions">
            <button className="btn-join-video">Join Video Call</button>
            <button className="btn-dismiss" onClick={() => setShowNotification(false)}>Dismiss</button>
          </div>
          <div className="session-time">
            <div className="time-indicator">5:00 PM</div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">👥</div>
          <div className="stat-content">
            <div className="stat-label">Groups Joined</div>
            <div className="stat-number-dash">7</div>
          </div>
        </div>
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">📚</div>
          <div className="stat-content">
            <div className="stat-label">Hours Studied</div>
            <div className="stat-number-dash">12.5</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Upcoming Sessions Timeline */}
        <div className="dashboard-section">
          <h3>Upcoming Sessions</h3>
          <div className="sessions-timeline">
            <div className="timeline-item">
              <div className="timeline-dot active"></div>
              <div className="session-info">
                <h4>React Hooks Mastery</h4>
                <p>Today</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="session-info">
                <h4>Data Science Basics - Python</h4>
                <p>Beginner • 1h30min • 11:30am</p>
                <p>Today</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="session-info">
                <h4>Math</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Discover Study Groups */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Discover Study Groups</h3>
            <div className="filter-tabs">
              <button className="filter-tab active">Python</button>
              <button className="filter-tab">React</button>
            </div>
          </div>
          
          <div className="groups-grid-dashboard">
            {availableGroups.slice(0, 2).map(group => (
              <div key={group.id} className="group-card-dashboard" onClick={() => handleCardClick(group.id)}>
                <div className="group-header">
                  <div className="group-avatar">
                    <img src="/api/placeholder/40/40" alt={`${group.title} group`} className="avatar-img" />
                  </div>
                  <div className="group-info">
                    <h4>{group.title}</h4>
                    <p>{group.description}</p>
                  </div>
                </div>
                <div className="group-actions">
                  <button 
                    className="btn-join-group"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleJoin(group.id);
                    }}
                  >
                    Join Group
                  </button>
                  <button className="btn-view-details">View Details</button>
                </div>
                <div className="member-badge">Member</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
