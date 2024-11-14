import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Study Buddy</h1>
      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/study-groups" className="nav-link">
              Study Groups
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link">
              Schedule
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/subjects" className="nav-link">
              Subjects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
