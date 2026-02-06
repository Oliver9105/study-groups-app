import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function CreateGroup({ onClose }) {
  const { state, dispatch } = useApp();
  const [newGroup, setNewGroup] = useState({
    name: '',
    subject: '',
    description: '',
    nextSession: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newGroup.name || !newGroup.subject || !newGroup.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (!state.user.name) {
      alert('Please create a profile first to create groups!');
      window.location.href = '/profile';
      return;
    }

    dispatch({
      type: 'ADD_STUDY_GROUP',
      payload: {
        ...newGroup,
        members: [state.user.name]
      }
    });
    
    setNewGroup({ name: '', subject: '', description: '', nextSession: '' });
    onClose();
    alert('Study group created successfully!');
  };

  const handleInputChange = (e) => {
    setNewGroup({
      ...newGroup,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem'
    }}>
      <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Create New Study Group</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Group Name *</label>
            <input 
              type="text" 
              name="name" 
              value={newGroup.name} 
              onChange={handleInputChange}
              placeholder="e.g., Advanced React Concepts"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Subject *</label>
            <select 
              name="subject" 
              value={newGroup.subject} 
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="" style={{ background: '#2d3748' }}>Select a subject</option>
              {state.subjects.map(subject => (
                <option key={subject} value={subject} style={{ background: '#2d3748' }}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Description *</label>
          <textarea 
            name="description" 
            value={newGroup.description} 
            onChange={handleInputChange}
            placeholder="Describe what this study group focuses on..."
            rows="3"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Next Session (Optional)</label>
          <input 
            type="datetime-local" 
            name="nextSession" 
            value={newGroup.nextSession} 
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn-join-group" style={{ flex: 1 }}>
            Create Group
          </button>
          <button type="button" className="btn-dismiss" onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
