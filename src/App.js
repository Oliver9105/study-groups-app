import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import StudyGroups from './components/StudyGroups';
import Subjects from './components/Subjects';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/subjects" element={<Subjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
