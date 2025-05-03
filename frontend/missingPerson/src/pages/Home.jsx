"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Home.css"

const Home = () => {
  const { currentUser, isAdmin } = useAuth()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Help Find Missing People</h1>
          <p>Our platform connects communities to help locate missing individuals and reunite families.</p>

          {currentUser ? (
            <div className="hero-buttons">
              <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} className="btn btn-primary">
                Go to Dashboard
              </Link>
              <Link to="/report" className="btn btn-secondary">
                Report Missing Person
              </Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Report Missing Person</h3>
          <p>Submit details about a missing person to help in the search efforts.</p>
          <Link to={currentUser ? "/report" : "/login"} className="feature-link">
            Report Now
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Search Database</h3>
          <p>Search our database of reported missing persons.</p>
          <Link to={currentUser ? "/dashboard" : "/login"} className="feature-link">
            Search
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3>Latest Updates</h3>
          <p>View the latest updates on missing person cases.</p>
          <Link to={currentUser ? "/dashboard" : "/login"} className="feature-link">
            View Updates
          </Link>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create an account to access all features</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Report</h3>
            <p>Submit details about a missing person</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track</h3>
            <p>Monitor the status of reported cases</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Collaborate</h3>
            <p>Work together to find missing individuals</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
