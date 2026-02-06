import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { initialGroups } from '../mockData';

function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [joined, setJoined] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    location: ''
  });
  
  const group = initialGroups.find(g => g.id === parseInt(id));
  const groupTopics = state.topics ? state.topics.filter(topic => topic.subject === group?.subject) : [];
  
  const handleJoinGroup = () => {
    if (!state.user.name) {
      alert('Please create a profile first!');
      navigate('/profile');
      return;
    }
    setJoined(!joined);
    if (!joined) {
      dispatch({
        type: 'JOIN_GROUP',
        payload: {
          groupId: parseInt(id),
          userName: state.user.name
        }
      });
      alert('Successfully joined the group!');
    }
  };
  
  const handleScheduleSession = (e) => {
    e.preventDefault();
    if (!newSession.title || !newSession.date || !newSession.time) {
      alert('Please fill in all required fields');
      return;
    }
    
    dispatch({
      type: 'ADD_SESSION',
      payload: {
        ...newSession,
        groupId: parseInt(id)
      }
    });
    
    setNewSession({ title: '', date: '', time: '', duration: '', location: '' });
    setShowScheduleForm(false);
    alert('Session scheduled successfully!');
  };
  
  if (!group) {
    return (
      <div className="group-detail-dark">
        <div className="detail-card">
          <h2>Group not found</h2>
          <button className="btn-back-dark" onClick={() => navigate('/groups')}>
            Back to Groups
          </button>
        </div>
      </div>
    );
  }

  const getUnderstandingColor = (rate) => {
    if (rate >= 80) return '#48bb78';
    if (rate >= 70) return '#ed8936';
    return '#f56565';
  };

  return (
    <div className="group-detail-dark">
      {/* Header */}
      <div className="detail-header">
        <button className="btn-back-dark" onClick={() => navigate('/groups')}>
          ← Back to Groups
        </button>
        <div className="group-title-section">
          <div className="group-avatar-large">
            <img src="/api/placeholder/80/80" alt={`${group.title} group avatar`} className="avatar-img-large" />
          </div>
          <div className="group-title-info">
            <h1>{group.title}</h1>
            <p>{group.description}</p>
            <div className="group-meta">
              <span className="subject-badge-dark">{group.subject}</span>
              <span className="member-count">{group.memberList?.length || group.members} members</span>
            </div>
          </div>
        </div>
        <div className="group-actions-header">
          <button className="btn-join-dark" onClick={handleJoinGroup}>
            {joined || group.joined ? '✓ Joined' : 'Join Group'}
          </button>
          <button className="btn-schedule-dark" onClick={() => setShowScheduleForm(!showScheduleForm)}>
            {showScheduleForm ? 'Cancel' : 'Schedule Session'}
          </button>
        </div>
      </div>
      
      {/* Schedule Session Form */}
      {showScheduleForm && (
        <div className="detail-section" style={{ marginBottom: '2rem' }}>
          <div className="meeting-card-dark">
            <h3>Schedule New Session</h3>
            <form onSubmit={handleScheduleSession}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Session Title *</label>
                  <input 
                    type="text" 
                    value={newSession.title} 
                    onChange={(e) => setNewSession({...newSession, title: e.target.value})}
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
                    value={newSession.date} 
                    onChange={(e) => setNewSession({...newSession, date: e.target.value})}
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
                    value={newSession.time} 
                    onChange={(e) => setNewSession({...newSession, time: e.target.value})}
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
                    value={newSession.duration} 
                    onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
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
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Location</label>
                  <input 
                    type="text" 
                    value={newSession.location} 
                    onChange={(e) => setNewSession({...newSession, location: e.target.value})}
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
              <button type="submit" className="btn-join-meeting-dark" style={{ marginTop: '1rem' }}>
                Schedule Session
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="detail-content-grid">
        {/* Left Column */}
        <div className="detail-left-column">
          {/* Next Meeting */}
          <div className="detail-section">
            <h3>Next Meeting</h3>
            <div className="meeting-card-dark">
              <div className="meeting-time">
                <div className="time-large">{group.time}</div>
                <div className="date-info">{group.date}</div>
              </div>
              <div className="meeting-details">
                <p><strong>Location:</strong> {group.location}</p>
                <p><strong>Duration:</strong> 1h 30min</p>
              </div>
              <button className="btn-join-meeting-dark">Join Video Call</button>
            </div>
          </div>

          {/* Group Resources */}
          <div className="detail-section">
            <h3>Shared Resources</h3>
            <div className="resources-list-dark">
              {group.resources?.map((resource, index) => (
                <div key={index} className="resource-item-dark">
                  <div className="resource-icon">
                    {resource.type === 'PDF' ? '📄' : '🔗'}
                  </div>
                  <div className="resource-info">
                    <div className="resource-name">{resource.name}</div>
                    <div className="resource-type">{resource.type} File</div>
                  </div>
                  <button className="btn-download">Download</button>
                </div>
              )) || (
                <p className="no-resources">No resources shared yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="detail-right-column">
          {/* Members */}
          <div className="detail-section">
            <h3>Members ({group.memberList?.length || group.members})</h3>
            <div className="members-grid-dark">
              {group.memberList?.map((member, index) => (
                <div key={index} className="member-card-dark">
                  <div className="member-avatar">
                    {member.avatar}
                  </div>
                  <div className="member-info">
                    <div className="member-name">{member.name}</div>
                    <div className="member-role">{member.role}</div>
                  </div>
                  {member.role === 'Admin' && (
                    <div className="admin-badge">Admin</div>
                  )}
                </div>
              )) || (
                Array.from({ length: group.members }, (_, i) => (
                  <div key={i} className="member-card-dark">
                    <div className="member-avatar">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="member-info">
                      <div className="member-name">Member {i + 1}</div>
                      <div className="member-role">Student</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Topics Performance */}
          <div className="detail-section">
            <h3>Topics & Performance</h3>
            {groupTopics.length > 0 ? (
              <div className="topics-list-dark">
                {groupTopics.map(topic => (
                  <div key={topic.id} className="topic-item-dark">
                    <div className="topic-header">
                      <h4>{topic.title}</h4>
                      <div 
                        className="understanding-score"
                        style={{ color: getUnderstandingColor(topic.understandingRate) }}
                      >
                        {topic.understandingRate}%
                      </div>
                    </div>
                    <div className="topic-meta">
                      <span className="difficulty-badge">{topic.difficulty}</span>
                      <span className="student-count">{topic.studentsCount} students</span>
                    </div>
                    <div className="progress-bar-dark">
                      <div 
                        className="progress-fill-dark"
                        style={{ 
                          width: `${topic.understandingRate}%`,
                          backgroundColor: getUnderstandingColor(topic.understandingRate)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-topics">No topics available for this subject</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;