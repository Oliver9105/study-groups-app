import React from 'react';
import { useApp } from '../context/AppContext';

function StudyProgress() {
  const { state } = useApp();

  const totalHours = 42;
  const weeklyGoal = 50;
  const progress = (totalHours / weeklyGoal) * 100;

  const stats = [
    { label: 'Total Hours', value: totalHours, icon: '⏱️', color: '#4f46e5' },
    { label: 'Sessions Completed', value: state.sessions.length, icon: '✅', color: '#10b981' },
    { label: 'Topics Mastered', value: 12, icon: '🎯', color: '#f59e0b' },
    { label: 'Current Streak', value: '7 days', icon: '🔥', color: '#ef4444' }
  ];

  return (
    <div className="dashboard-section">
      <h3>Study Progress</h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'white' }}>Weekly Goal Progress</span>
          <span style={{ color: '#4f46e5', fontWeight: 'bold' }}>{totalHours}/{weeklyGoal} hours</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          height: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
            height: '100%',
            width: `${progress}%`,
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color, marginBottom: '0.25rem' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyProgress;
