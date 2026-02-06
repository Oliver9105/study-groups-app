import React from 'react';

function SearchFilter({ searchTerm, setSearchTerm, selectedSubject, setSelectedSubject, subjects }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
      <input
        type="text"
        placeholder="🔍 Search groups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          flex: 1,
          padding: '0.75rem',
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          fontSize: '1rem'
        }}
      />
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        style={{
          padding: '0.75rem',
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          minWidth: '150px'
        }}
      >
        <option value="">All Subjects</option>
        {subjects.map(subject => (
          <option key={subject} value={subject} style={{ background: '#2d3748' }}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
