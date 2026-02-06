import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { initialGroups } from '../mockData';

function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  
  const group = initialGroups.find(g => g.id === parseInt(id));
  const groupTopics = state.topics ? state.topics.filter(topic => topic.subject === group?.subject) : [];
  
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
          <button className="btn-join-dark">
            {group.joined ? '✓ Joined' : 'Join Group'}
          </button>
          <button className="btn-schedule-dark">Schedule Session</button>
        </div>
      </div>

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