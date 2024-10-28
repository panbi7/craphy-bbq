// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/waiting-list">Waiting List</Link> | 
        <Link to="/admin">Craphy(admin)</Link>
      </nav>
    </header>
  );
}

export default Header;
