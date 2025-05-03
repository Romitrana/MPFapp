"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import "../styles/ReportDetails.css"

const ReportDetails = () => {
  const { id } = useParams()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchReport()
  }, [id])

  const fetchReport = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      setReport(response.data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch report details. Please try again later.")
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

  if (loading) {
    return <div className="loading-container">Loading report details...</div>
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>
  }

  if (!report) {
    return <div className="alert alert-warning">Report not found.</div>
  }

  return (
    <div className="report-details">
      <div className="report-details-header">
        <div className="header-content">
          <h1>{report.fullName}</h1>
          <p className="report-id">Report ID: {report.id}</p>
        </div>
        <span className={`badge ${getStatusBadgeClass(report.status)}`}>{getStatusText(report.status)}</span>
      </div>

      <div className="report-details-content">
        <div className="details-section">
          <h2>Missing Person Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Age</span>
              <span className="detail-value">{report.age}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gender</span>
              <span className="detail-value">{report.gender || "Not specified"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Seen Date</span>
              <span className="detail-value">{new Date(report.lastSeenDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Seen Location</span>
              <span className="detail-value">{report.lastSeenLocation}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Report Status</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-value">
                <span className={`badge ${getStatusBadgeClass(report.status)}`}>{getStatusText(report.status)}</span>
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Created</span>
              <span className="detail-value">{new Date(report.createdAt).toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Updated</span>
              <span className="detail-value">{new Date(report.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Physical Description</h2>
          <div className="details-cards">
            <div className="detail-card">
              <h3>Physical Attributes</h3>
              <p>{report.physicalAttributes || "Not provided"}</p>
            </div>
            <div className="detail-card">
              <h3>Clothing Description</h3>
              <p>{report.clothingDescription || "Not provided"}</p>
            </div>
            <div className="detail-card">
              <h3>Medical Conditions</h3>
              <p>{report.medicalConditions || "Not provided"}</p>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Additional Description</h2>
          <div className="detail-card full-width">
            <p>{report.description || "No additional description provided."}</p>
          </div>
        </div>

        <div className="details-section">
          <h2>Contact Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Contact Name</span>
              <span className="detail-value">{report.contactName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Contact Phone</span>
              <span className="detail-value">{report.contactPhone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Contact Email</span>
              <span className="detail-value">{report.contactEmail}</span>
            </div>
          </div>
        </div>

        {report.additionalInfo && (
          <div className="details-section">
            <h2>Additional Information</h2>
            <div className="detail-card full-width">
              <p>{report.additionalInfo}</p>
            </div>
          </div>
        )}
      </div>

      <div className="report-details-actions">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Back
        </button>
        <Link to={`/reports/${report.id}/update`} className="btn btn-primary">
          Update Report
        </Link>
      </div>
    </div>
  )
}

export default ReportDetails
