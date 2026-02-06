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
    <div className="card">
      <h2>Create New Study Group</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label>Group Name *</label>
            <input 
              type="text" 
              name="name" 
              value={newGroup.name} 
              onChange={handleInputChange}
              placeholder="e.g., Advanced React Concepts"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Subject *</label>
            <select 
              name="subject" 
              value={newGroup.subject} 
              onChange={handleInputChange}
              required
            >
              <option value="">Select a subject</option>
              {state.subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>Description *</label>
          <textarea 
            name="description" 
            value={newGroup.description} 
            onChange={handleInputChange}
            placeholder="Describe what this study group focuses on..."
            rows="3"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Next Session (Optional)</label>
          <input 
            type="datetime-local" 
            name="nextSession" 
            value={newGroup.nextSession} 
            onChange={handleInputChange}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            Create Group
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
