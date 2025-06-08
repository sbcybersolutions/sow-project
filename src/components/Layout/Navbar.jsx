import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png'; // adjust path based on your actual structure

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light px-4">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Logo" className="logo me-2" />
        <span className="fw-bold">SOW Calculator</span>
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/build' ? 'active' : ''}`}
              to="/build"
            >
              Build Quote
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/quotes' ? 'active' : ''}`}
              to="/quotes"
            >
              Saved Quotes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
