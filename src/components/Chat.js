import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Chat({ groupId }) {
  const { state } = useApp();
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'Hey everyone! Ready for today\'s session?', time: '10:30 AM' },
    { id: 2, user: 'Bob', text: 'Yes! Looking forward to it.', time: '10:32 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        user: state.user.name || 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {!showChat ? (
        <button
          onClick={() => setShowChat(true)}
          style={{
            background: '#4f46e5',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}
        >
          💬
        </button>
      ) : (
        <div style={{
          background: '#1e293b',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '12px',
          width: '350px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h4 style={{ margin: 0, color: 'white' }}>Group Chat</h4>
            <button
              onClick={() => setShowChat(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                background: msg.user === (state.user.name || 'You') ? '#4f46e5' : 'rgba(255,255,255,0.1)',
                padding: '0.75rem',
                borderRadius: '8px',
                alignSelf: msg.user === (state.user.name || 'You') ? 'flex-end' : 'flex-start',
                maxWidth: '80%'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                  {msg.user} • {msg.time}
                </div>
                <div style={{ color: 'white' }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '0.5rem',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px'
              }}
            />
            <button type="submit" style={{
              background: '#4f46e5',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: 'white',
              cursor: 'pointer'
            }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
