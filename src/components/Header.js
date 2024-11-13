import React from 'react';

function Header() {
  return (
    <header className="header">
      <h1>Study Buddy</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
        <a href="/study-groups">Study Groups</a>
        <a href="/subjects">Subjects</a>
      </nav>
    </header>
  );
}

export default Header;
