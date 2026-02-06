import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Topics() {
  const { state } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('');

  const filteredTopics = selectedSubject
    ? state.topics.filter(topic => topic.subject === selectedSubject)
    : state.topics;

  const getUnderstandingColor = (rate) => {
    if (rate >= 80) return '#10b981'; // Green
    if (rate >= 70) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      'Beginner': 'background: #dcfce7; color: #166534',
      'Intermediate': 'background: #fef3c7; color: #92400e',
      'Advanced': 'background: #fef2f2; color: #dc2626'
    };
    return colors[difficulty] || colors['Intermediate'];
  };

  return (
    <div className="fade-in">
      <div className="card">
        <h1>Class Topics & Understanding</h1>
        <p>Track topics covered in class and student understanding rates</p>
        
        <div className="form-group" style={{ maxWidth: '300px', marginTop: '1rem' }}>
          <label>Filter by Subject:</label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {state.subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="label">Total Topics</span>
          <div className="value">{filteredTopics.length}</div>
        </div>
        <div className="stat-card">
          <span className="label">Avg Understanding</span>
          <div className="value">
            {Math.round(filteredTopics.reduce((sum, topic) => sum + topic.understandingRate, 0) / filteredTopics.length || 0)}%
          </div>
        </div>
        <div className="stat-card highlight">
          <span className="label">Total Students</span>
          <div className="value">
            {filteredTopics.reduce((sum, topic) => sum + topic.studentsCount, 0)}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Topics Overview</h2>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          {filteredTopics.map(topic => (
            <div key={topic.id} className="card" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{topic.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className={`badge ${topic.subject.toLowerCase()}`}>{topic.subject}</span>
                    <span 
                      className="badge" 
                      style={{ ...getDifficultyBadge(topic.difficulty) }}
                    >
                      {topic.difficulty}
                    </span>
                  </div>
                  <p className="text-muted">Last taught: {topic.lastTaught}</p>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700',
                    color: getUnderstandingColor(topic.understandingRate)
                  }}>
                    {topic.understandingRate}%
                  </div>
                  <div className="text-muted">{topic.studentsCount} students</div>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>Understanding Rate</span>
                  <span>{topic.understandingRate}%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  background: '#e2e8f0', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${topic.understandingRate}%`, 
                    height: '100%', 
                    background: getUnderstandingColor(topic.understandingRate),
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTopics.length === 0 && (
          <div className="text-center" style={{ padding: '2rem' }}>
            <p className="text-muted">No topics found for the selected subject.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topics;