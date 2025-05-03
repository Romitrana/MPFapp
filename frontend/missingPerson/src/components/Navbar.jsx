"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Navbar.css"

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🔍</span>
          <span className="logo-text">Missing Person Finder</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-icon-bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon-bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon-bar ${menuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to="/report" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Report Missing
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item user-menu">
                <div className="user-menu-trigger">
                  <span className="username">{currentUser.username}</span>
                  <span className="dropdown-icon">▼</span>
                </div>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link register-btn" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
