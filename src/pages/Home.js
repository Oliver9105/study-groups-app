import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { initialGroups } from '../mockData';
import CreateGroup from '../components/CreateGroup';

function Home() {
  const { state } = useApp();
  const [groups, setGroups] = useState(initialGroups);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleJoin = (id) => {
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === id ? { ...group, joined: !group.joined } : group
      )
    );
  };

  const joinedGroupsCount = groups.filter(g => g.joined).length;

  return (
    <div className="groups-dashboard">
      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">👥</div>
          <div className="stat-content">
            <div className="stat-label">Groups Joined</div>
            <div className="stat-number-dash">{joinedGroupsCount}</div>
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
        <div className="dashboard-section">
          <h3>Your Schedule</h3>
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
          </div>
        </div>

        <div className="dashboard-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Discover Groups</h3>
            <button className="btn-join-group" onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? 'Cancel' : '+ Create Group'}
            </button>
          </div>
          
          {showCreateForm && (
            <div style={{ marginBottom: '2rem' }}>
              <CreateGroup onClose={() => setShowCreateForm(false)} />
            </div>
          )}
          
          <div className="groups-grid-dashboard">
            {groups.slice(0, 4).map(group => (
              <div key={group.id} className="group-card-dashboard">
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
                    onClick={() => toggleJoin(group.id)}
                  >
                    {group.joined ? '✓ Joined' : 'Join Group'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
