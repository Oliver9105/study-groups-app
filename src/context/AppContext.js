import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: {
    id: null,
    name: '',
    email: '',
    subjects: []
  },
  studyGroups: [
    {
      id: 1,
      name: 'React Fundamentals',
      subject: 'JavaScript',
      members: ['Alice Johnson', 'Bob Smith'],
      description: 'Learning React basics and components',
      nextSession: '2025-10-08 14:00'
    },
    {
      id: 2,
      name: 'Data Structures',
      subject: 'Computer Science',
      members: ['Charlie Brown', 'Diana Prince'],
      description: 'Studying algorithms and data structures',
      nextSession: '2025-10-09 16:00'
    }
  ],
  sessions: [
    {
      id: 1,
      groupId: 1,
      title: 'React Components Deep Dive',
      date: '2025-10-08',
      time: '14:00',
      duration: '2 hours',
      location: 'Library Room A'
    },
    {
      id: 2,
      groupId: 2,
      title: 'Binary Trees Workshop',
      date: '2025-10-09',
      time: '16:00',
      duration: '1.5 hours',
      location: 'Computer Lab'
    }
  ],
  subjects: ['JavaScript', 'Python', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry'],
  topics: [
    {
      id: 1,
      title: 'React Hooks',
      subject: 'JavaScript',
      difficulty: 'Intermediate',
      understandingRate: 78,
      studentsCount: 45,
      lastTaught: '2024-01-15'
    },
    {
      id: 2,
      title: 'Binary Search Trees',
      subject: 'Computer Science',
      difficulty: 'Advanced',
      understandingRate: 65,
      studentsCount: 32,
      lastTaught: '2024-01-10'
    },
    {
      id: 3,
      title: 'Async/Await',
      subject: 'JavaScript',
      difficulty: 'Intermediate',
      understandingRate: 82,
      studentsCount: 38,
      lastTaught: '2024-01-12'
    },
    {
      id: 4,
      title: 'Calculus Integration',
      subject: 'Mathematics',
      difficulty: 'Advanced',
      understandingRate: 58,
      studentsCount: 28,
      lastTaught: '2024-01-08'
    },
    {
      id: 5,
      title: 'Python Decorators',
      subject: 'Python',
      difficulty: 'Advanced',
      understandingRate: 71,
      studentsCount: 25,
      lastTaught: '2024-01-14'
    }
  ]
};

// Load state from localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem('studyBuddyState');
    return savedState ? JSON.parse(savedState) : initialState;
  } catch {
    return initialState;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem('studyBuddyState', JSON.stringify(state));
  } catch {
    // Ignore localStorage errors
  }
};

// Reducer function
function appReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, user: action.payload };
      break;
    
    case 'ADD_STUDY_GROUP':
      newState = {
        ...state,
        studyGroups: [...state.studyGroups, { ...action.payload, id: Date.now() }]
      };
      break;
    
    case 'JOIN_GROUP':
      newState = {
        ...state,
        studyGroups: state.studyGroups.map(group =>
          group.id === action.payload.groupId
            ? { ...group, members: [...group.members, action.payload.userName] }
            : group
        )
      };
      break;
    
    case 'ADD_SESSION':
      newState = {
        ...state,
        sessions: [...state.sessions, { ...action.payload, id: Date.now() }]
      };
      break;
    
    case 'ADD_SUBJECT':
      newState = {
        ...state,
        user: {
          ...state.user,
          subjects: [...state.user.subjects, action.payload]
        }
      };
      break;
    
    default:
      return state;
  }
  
  saveState(newState);
  return newState;
}

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, loadState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
