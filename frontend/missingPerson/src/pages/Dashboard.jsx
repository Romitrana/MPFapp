"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import "../styles/Dashboard.css"

const Dashboard = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { currentUser } = useAuth()

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reports/user", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      setReports(response.data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch reports. Please try again later.")
      setLoading(false)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "MISSING":
        return "badge-danger"
      case "FOUND":
        return "badge-success"
      case "UNDER_PROCESS":
        return "badge-warning"
      default:
        return "badge-secondary"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "MISSING":
        return "Missing"
      case "FOUND":
        return "Found"
      case "UNDER_PROCESS":
        return "Under Process"
      default:
        return "Unknown"
    }
  }

  const filteredReports =
    activeTab === "all" ? reports : reports.filter((report) => report.status === activeTab.toUpperCase())

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {currentUser.username}</p>
        <Link to="/report" className="btn btn-primary">
          Report Missing Person
        </Link>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <div className="stat-value">{reports.length}</div>
        </div>
        <div className="stat-card">
          <h3>Missing</h3>
          <div className="stat-value">{reports.filter((r) => r.status === "MISSING").length}</div>
        </div>
        <div className="stat-card">
          <h3>Found</h3>
          <div className="stat-value">{reports.filter((r) => r.status === "FOUND").length}</div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="tabs">
        <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
          All Reports
        </button>
        <button className={`tab ${activeTab === "missing" ? "active" : ""}`} onClick={() => setActiveTab("missing")}>
          Missing
        </button>
        <button className={`tab ${activeTab === "found" ? "active" : ""}`} onClick={() => setActiveTab("found")}>
          Found
        </button>
        <button
          className={`tab ${activeTab === "under_process" ? "active" : ""}`}
          onClick={() => setActiveTab("under_process")}
        >
          Under Process
        </button>
      </div>

      <div className="tab-content">
        {loading ? (
          <div className="loading">Loading reports...</div>
        ) : filteredReports.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No reports found in this category.</p>
            {activeTab === "all" && (
              <Link to="/report" className="btn btn-primary">
                Report Missing Person
              </Link>
            )}
          </div>
        ) : (
          <div className="reports-list">
            {filteredReports.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div>
                    <h3>{report.fullName}</h3>
                    <p className="report-meta">
                      Age: {report.age} • Reported on: {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`badge ${getStatusBadgeClass(report.status)}`}>{getStatusText(report.status)}</span>
                </div>
                <div className="report-body">
                  <p>
                    <strong>Last seen:</strong> {new Date(report.lastSeenDate).toLocaleDateString()} at{" "}
                    {report.lastSeenLocation}
                  </p>
                </div>
                <div className="report-footer">
                  <Link to={`/reports/${report.id}`} className="btn btn-outline">
                    View Details
                  </Link>
                  <Link to={`/reports/${report.id}/update`} className="btn btn-outline">
                    Update
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
