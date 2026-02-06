import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

function Notifications() {
  const { state } = useApp();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const upcomingSessions = state.sessions.filter(session => {
      const sessionDate = new Date(session.date + ' ' + session.time);
      const now = new Date();
      const diff = sessionDate - now;
      return diff > 0 && diff < 3600000; // Within 1 hour
    });

    const notifs = upcomingSessions.map(session => ({
      id: session.id,
      type: 'session',
      message: `${session.title} starts soon!`,
      time: session.time
    }));

    setNotifications(notifs);
  }, [state.sessions]);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          color: 'white',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        🔔 Notifications
        {notifications.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#ef4444',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem'
          }}>
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '0.5rem',
          background: '#1e293b',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          minWidth: '300px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ margin: 0, color: 'white' }}>Notifications</h4>
          </div>
          {notifications.length > 0 ? (
            notifications.map(notif => (
              <div key={notif.id} style={{
                padding: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                color: 'white'
              }}>
                <p style={{ margin: 0 }}>{notif.message}</p>
                <small style={{ color: '#94a3b8' }}>{notif.time}</small>
              </div>
            ))
          ) : (
            <div style={{ padding: '1rem', color: '#94a3b8', textAlign: 'center' }}>
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;
