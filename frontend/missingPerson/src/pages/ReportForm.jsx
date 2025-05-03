"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import "../styles/ReportForm.css"

const ReportForm = () => {
  const initialFormState = {
    fullName: "",
    age: "",
    gender: "",
    lastSeenDate: "",
    lastSeenLocation: "",
    description: "",
    physicalAttributes: "",
    clothingDescription: "",
    medicalConditions: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    additionalInfo: "",
  }

  const [formData, setFormData] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!consentChecked) {
      setError("You must consent to share this information")
      return
    }

    setLoading(true)

    try {
      await axios.post("http://localhost:8080/api/reports", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      })

      setSuccess(true)
      setFormData(initialFormState)
      setConsentChecked(false)

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="report-form-container">
      <div className="report-form-header">
        <h1>Report a Missing Person</h1>
        <p>Please provide as much detail as possible to help in the search efforts</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">Your report has been submitted successfully!</div>}

      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-section">
          <h2>Missing Person Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lastSeenDate">Last Seen Date</label>
              <input
                type="date"
                id="lastSeenDate"
                name="lastSeenDate"
                value={formData.lastSeenDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastSeenLocation">Last Seen Location</label>
              <input
                type="text"
                id="lastSeenLocation"
                name="lastSeenLocation"
                value={formData.lastSeenLocation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="physicalAttributes">Physical Attributes</label>
            <textarea
              id="physicalAttributes"
              name="physicalAttributes"
              placeholder="Height, weight, eye color, hair color, distinguishing features, etc."
              value={formData.physicalAttributes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="clothingDescription">Clothing Description</label>
            <textarea
              id="clothingDescription"
              name="clothingDescription"
              placeholder="What the person was wearing when last seen"
              value={formData.clothingDescription}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="medicalConditions">Medical Conditions</label>
            <textarea
              id="medicalConditions"
              name="medicalConditions"
              placeholder="Any relevant medical conditions or medications"
              value={formData.medicalConditions}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="description">Additional Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide any additional details that might help in the search"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h2>Contact Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactName">Contact Name</label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Any other information that might be relevant"
              value={formData.additionalInfo}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              required
            />
            <label htmlFor="consent">
              I consent to share this information with law enforcement and relevant authorities to help find this person
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportForm
