import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Profile() {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: state.user.name || 'Jane Smith',
    email: state.user.email || '',
    bio: state.user.bio || 'Junior CS Major @ Stanford • Member since 2026',
    university: state.user.university || 'Stanford'
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleAddSubject = () => {
    // Subject adding functionality would go here
  };

  const handleRemoveSubject = (subjectToRemove) => {
    dispatch({
      type: 'SET_USER',
      payload: {
        ...state.user,
        subjects: state.user.subjects.filter(subject => subject !== subjectToRemove)
      }
    });
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JS';
  };

  const achievements = [
    { name: '100 Club', earned: true, color: '#dc2626', shape: 'hexagon' },
    { name: 'Python Pro', earned: true, color: '#ea580c', shape: 'hexagon' },
    { name: 'Python Pro', earned: true, color: '#16a34a', shape: 'hexagon' },
    { name: 'Top Contributor', earned: true, color: '#2563eb', shape: 'hexagon' },
    { name: 'Early Bird', earned: false, color: '#6b7280', shape: 'hexagon' }
  ];

  return (
    <div className="groups-dashboard">
      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">👥</div>
          <div className="stat-content">
            <div className="stat-label">Groups Joined</div>
            <div className="stat-number-dash">8</div>
          </div>
        </div>
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">📚</div>
          <div className="stat-content">
            <div className="stat-label">Study Hours</div>
            <div className="stat-number-dash">42</div>
          </div>
        </div>
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">🎯</div>
          <div className="stat-content">
            <div className="stat-label">Recent Sessions</div>
            <div className="stat-number-dash">4</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Profile Info */}
        <div className="dashboard-section">
          <h3>Profile Information</h3>
          <div className="group-card-dashboard">
            <div className="group-header">
              <div className="group-avatar" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => document.getElementById('avatar-upload').click()}>
                {getInitials(formData.name)}
                <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: '#4f46e5', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>📷</div>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      alert('Profile picture updated!');
                    }
                  }}
                />
              </div>
              <div className="group-info">
                <h4>{formData.name}</h4>
                <p>{formData.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="dashboard-section">
          <h3>My Subjects</h3>
          <div className="sessions-timeline">
            {state.user.subjects.map((subject, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot active"></div>
                <div className="session-info">
                  <h4>{subject}</h4>
                  <button 
                    onClick={() => handleRemoveSubject(subject)}
                    className="btn-dismiss"
                    style={{ marginTop: '0.5rem' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="session-info">
                <button className="btn-join-group" onClick={handleAddSubject}>
                  + Add Subject
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="dashboard-section">
          <h3>Achievement Badges</h3>
          <div className="groups-grid-dashboard">
            {achievements.slice(0, 4).map((badge, index) => (
              <div key={index} className="group-card-dashboard">
                <div className="group-header">
                  <div 
                    className="group-avatar"
                    style={{ backgroundColor: badge.earned ? badge.color : '#6b7280' }}
                  >
                    🏆
                  </div>
                  <div className="group-info">
                    <h4>{badge.name}</h4>
                    <p>{badge.earned ? 'Earned' : 'Locked'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="dashboard-section">
          <h3>Settings</h3>
          <div className="group-card-dashboard">
            <div className="group-header">
              <div className="group-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <h4>Dark Mode</h4>
                <label style={{ 
                  position: 'relative',
                  display: 'inline-block',
                  width: '60px',
                  height: '34px'
                }}>
                  <input 
                    type="checkbox" 
                    checked={darkMode} 
                    onChange={(e) => setDarkMode(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: darkMode ? '#4f46e5' : '#ccc',
                    transition: '.4s',
                    borderRadius: '34px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '26px',
                      width: '26px',
                      left: darkMode ? '30px' : '4px',
                      bottom: '4px',
                      backgroundColor: 'white',
                      transition: '.4s',
                      borderRadius: '50%'
                    }}></span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;