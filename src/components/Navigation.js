import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    subject: '',
    description: ''
  });
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroup.name || !newGroup.subject) {
      alert('Please fill in group name and subject');
      return;
    }
    alert(`Group "${newGroup.name}" created successfully!`);
    setNewGroup({ name: '', subject: '', description: '' });
    setShowCreateForm(false);
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="brand">
          📚 StudyBuddy
        </Link>
        
        <nav className="nav-menu">
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/groups" className={`nav-link ${isActive('/groups')}`} onClick={() => setIsOpen(false)}>My Groups</Link>
          <Link to="/schedule" className={`nav-link ${isActive('/schedule')}`} onClick={() => setIsOpen(false)}>Calendar</Link>
          <Link to="/profile" className={`nav-link ${isActive('/profile')}`} onClick={() => setIsOpen(false)}>Profile</Link>
        </nav>
        
        <button className="btn-create" onClick={() => setShowCreateForm(true)}>
          + Create Group
        </button>
      </aside>
      
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
      
      {/* Create Group Modal */}
      {showCreateForm && (
        <div className="sidebar-overlay" style={{ zIndex: 1001 }}>
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(30, 41, 59, 0.95)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: '400px',
            zIndex: 1002
          }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Create New Study Group</h3>
            <form onSubmit={handleCreateGroup}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Group Name *</label>
                <input 
                  type="text" 
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                  placeholder="e.g., React Study Group"
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Subject *</label>
                <select 
                  value={newGroup.subject}
                  onChange={(e) => setNewGroup({...newGroup, subject: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <option value="">Select Subject</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="React">React</option>
                  <option value="Math">Math</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea 
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    color: 'white',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Describe your study group..."
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Create Group
                </button>
                <button 
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'transparent',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
