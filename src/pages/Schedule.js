import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Schedule() {
  const { state, dispatch } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSession, setNewSession] = useState({
    groupId: '',
    title: '',
    date: '',
    time: '',
    duration: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSession.groupId || !newSession.title || !newSession.date || !newSession.time) {
      alert('Please fill in all required fields');
      return;
    }

    dispatch({
      type: 'ADD_SESSION',
      payload: newSession
    });
    
    setNewSession({
      groupId: '',
      title: '',
      date: '',
      time: '',
      duration: '',
      location: ''
    });
    setShowCreateForm(false);
    alert('Study session scheduled successfully!');
  };

  const handleInputChange = (e) => {
    setNewSession({
      ...newSession,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="groups-dashboard">
      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">📅</div>
          <div className="stat-content">
            <div className="stat-label">Upcoming Sessions</div>
            <div className="stat-number-dash">{state.sessions.length}</div>
          </div>
        </div>
        <div className="stat-card-dashboard">
          <div className="stat-icon-dash">⏰</div>
          <div className="stat-content">
            <div className="stat-label">This Week</div>
            <div className="stat-number-dash">8</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Your Study Sessions</h3>
            <button 
              className="btn-join-group"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? 'Cancel' : 'Schedule Session'}
            </button>
          </div>
          
          {showCreateForm && (
            <div className="group-card-dashboard" style={{ marginBottom: '2rem' }}>
              <div className="group-header">
                <div className="group-info">
                  <h4>Schedule New Study Session</h4>
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                      <div>
                        <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Study Group *</label>
                        <select 
                          name="groupId" 
                          value={newSession.groupId} 
                          onChange={handleInputChange}
                          required
                          style={{ 
                            width: '100%',
                            padding: '0.5rem',
                            background: 'rgba(255,255,255,0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '4px'
                          }}
                        >
                          <option value="">Select a study group</option>
                          {state.studyGroups.map(group => (
                            <option key={group.id} value={group.id} style={{ background: '#2d3748', color: 'white' }}>
                              {group.name} - {group.subject}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Session Title *</label>
                        <input 
                          type="text" 
                          name="title" 
                          value={newSession.title} 
                          onChange={handleInputChange}
                          placeholder="e.g., React Hooks Workshop"
                          required
                          style={{ 
                            width: '100%',
                            padding: '0.5rem',
                            background: 'rgba(255,255,255,0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Date *</label>
                        <input 
                          type="date" 
                          name="date" 
                          value={newSession.date} 
                          onChange={handleInputChange}
                          required
                          style={{ 
                            width: '100%',
                            padding: '0.5rem',
                            background: 'rgba(255,255,255,0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Time *</label>
                        <input 
                          type="time" 
                          name="time" 
                          value={newSession.time} 
                          onChange={handleInputChange}
                          required
                          style={{ 
                            width: '100%',
                            padding: '0.5rem',
                            background: 'rgba(255,255,255,0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Duration</label>
                        <input 
                          type="text" 
                          name="duration" 
                          value={newSession.duration} 
                          onChange={handleInputChange}
                          placeholder="e.g., 2 hours"
                          style={{ 
                            width: '100%',
                            padding: '0.5rem',
                            background: 'rgba(255,255,255,0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Location</label>
                        <input 
                          type="text" 
                          name="location" 
                          value={newSession.location} 
                          onChange={handleInputChange}
                          placeholder="e.g., Library Room A"
                          style={{ 
                            width: '100%',
                            padding: '0.5rem',
                            background: 'rgba(255,255,255,0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                    
                    <button type="submit" className="btn-join-video" style={{ marginTop: '1rem' }}>
                      Schedule Session
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          
          <div className="sessions-timeline">
            {state.sessions.length > 0 ? (
              state.sessions.map(session => {
                const group = state.studyGroups.find(g => g.id === session.groupId);
                return (
                  <div key={session.id} className="timeline-item">
                    <div className="timeline-dot active"></div>
                    <div className="session-info">
                      <h4>{session.title}</h4>
                      {group && <p>{group.name} - {group.subject}</p>}
                      <p>{session.date} at {session.time}</p>
                      {session.duration && <p>Duration: {session.duration}</p>}
                      {session.location && <p>Location: {session.location}</p>}
                      <button 
                        className="btn-join-video" 
                        style={{ marginTop: '0.5rem' }}
                        onClick={() => window.open('https://meet.google.com/', '_blank')}
                      >
                        Join Session
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-sessions">
                <p>No study sessions scheduled yet.</p>
                <p>Schedule your first session to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
