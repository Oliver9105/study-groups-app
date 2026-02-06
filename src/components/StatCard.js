import React from 'react';

function StatCard({ label, value, isHighlight = false }) {
  return (
    <div className={`stat-card ${isHighlight ? 'highlight' : ''}`}>
      <span className="label">{label}</span>
      <div className="value">{value}</div>
    </div>
  );
}

export default StatCard;