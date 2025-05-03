// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import axios from "axios"
// import "../styles/ReportForm.css"

// const UpdateReport = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const { currentUser } = useAuth()

//   const [formData, setFormData] = useState({
//     fullName: "",
//     age: "",
//     gender: "",
//     lastSeenDate: "",
//     lastSeenLocation: "",
//     description: "",
//     physicalAttributes: "",
//     clothingDescription: "",
//     medicalConditions: "",
//     contactName: "",
//     contactPhone: "",
//     contactEmail: "",
//     additionalInfo: "",
//   })

//   const [loading, setLoading] = useState(true)
//   const [updating, setUpdating] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState(false)

//   useEffect(() => {
//     fetchReport()
//   }, [id])

//   const fetchReport = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/reports/${id}`, {
//         headers: {
//           Authorization: `Bearer ${currentUser.token}`,
//         },
//       })

//       const report = response.data
//       // Format date to YYYY-MM-DD for input
//       const formattedDate = report.lastSeenDate ? new Date(report.lastSeenDate).toISOString().split("T")[0] : ""

//       setFormData({
//         fullName: report.fullName || "",
//         age: report.age || "",
//         gender: report.gender || "",
//         lastSeenDate: formattedDate,
//         lastSeenLocation: report.lastSeenLocation || "",
//         description: report.description || "",
//         physicalAttributes: report.physicalAttributes || "",
//         clothingDescription: report.clothingDescription || "",
//         medicalConditions: report.medicalConditions || "",
//         contactName: report.contactName || "",
//         contactPhone: report.contactPhone || "",
//         contactEmail: report.contactEmail || "",
//         additionalInfo: report.additionalInfo || "",
//       })

//       setLoading(false)
//     } catch (err) {
//       setError("Failed to fetch report details. Please try again later.")
//       setLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setUpdating(true)

//     try {
//       await axios.put(`http://localhost:8080/api/reports/${id}`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${currentUser.token}`,
//         },
//       })

//       setSuccess(true)

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         navigate(`/reports/${id}`)
//       }, 2000)
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update report. Please try again.")
//     } finally {
//       setUpdating(false)
//     }
//   }

//   if (loading) {
//     return <div className="loading-container">Loading report data...</div>
//   }

//   return (
//     <div className="report-form-container">
//       <div className="report-form-header">
//         <h1>Update Report</h1>
//         <p>Update information about the missing person</p>
//       </div>

//       {error && <div className="alert alert-error">{error}</div>}
//       {success && <div className="alert alert-success">Report updated successfully!</div>}

//       <form onSubmit={handleSubmit} className="report-form">
//         <div className="form-section">
//           <h2>Missing Person Information</h2>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="fullName">Full Name</label>
//               <input
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="age">Age</label>
//               <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="gender">Gender</label>
//             <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="lastSeenDate">Last Seen Date</label>
//               <input
//                 type="date"
//                 id="lastSeenDate"
//                 name="lastSeenDate"
//                 value={formData.lastSeenDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="lastSeenLocation">Last Seen Location</label>
//               <input
//                 type="text"
//                 id="lastSeenLocation"
//                 name="lastSeenLocation"
//                 value={formData.lastSeenLocation}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="physicalAttributes">Physical Attributes</label>
//             <textarea
//               id="physicalAttributes"
//               name="physicalAttributes"
//               placeholder="Height, weight, eye color, hair color, distinguishing features, etc."
//               value={formData.physicalAttributes}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <label htmlFor="clothingDescription">Clothing Description</label>
//             <textarea
//               id="clothingDescription"
//               name="clothingDescription"
//               placeholder="What the person was wearing when last seen"
//               value={formData.clothingDescription}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <label htmlFor="medicalConditions">Medical Conditions</label>
//             <textarea
//               id="medicalConditions"
//               name="medicalConditions"
//               placeholder="Any relevant medical conditions or medications"
//               value={formData.medicalConditions}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Additional Description</label>
//             <textarea
//               id="description"
//               name="description"
//               placeholder="Provide any additional details that might help in the search"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>
//         </div>

//         <div className="form-section">
//           <h2>Contact Information</h2>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="contactName">Contact Name</label>
//               <input
//                 type="text"
//                 id="contactName"
//                 name="contactName"
//                 value={formData.contactName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="contactPhone">Contact Phone</label>
//               <input
//                 type="tel"
//                 id="contactPhone"
//                 name="contactPhone"
//                 value={formData.contactPhone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="contactEmail">Contact Email</label>
//             <input
//               type="email"
//               id="contactEmail"
//               name="contactEmail"
//               value={formData.contactEmail}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="additionalInfo">Additional Information</label>
//             <textarea
//               id="additionalInfo"
//               name="additionalInfo"
//               placeholder="Any other information that might be relevant"
//               value={formData.additionalInfo}
//               onChange={handleChange}
//             ></textarea>
//           </div>
//         </div>

//         <div className="form-actions">
//           <button type="button" className="btn btn-secondary" onClick={() => navigate(`/reports/${id}`)}>
//             Cancel
//           </button>
//           <button type="submit" className="btn btn-primary" disabled={updating}>
//             {updating ? "Updating..." : "Update Report"}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default UpdateReport

"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/ReportForm.css";

const UpdateReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
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
    status: "", // Added status field
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reports/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const report = response.data;
      // Format date to YYYY-MM-DD for input
      const formattedDate = report.lastSeenDate
        ? new Date(report.lastSeenDate).toISOString().split("T")[0]
        : "";

      setFormData({
        fullName: report.fullName || "",
        age: report.age || "",
        gender: report.gender || "",
        lastSeenDate: formattedDate,
        lastSeenLocation: report.lastSeenLocation || "",
        description: report.description || "",
        physicalAttributes: report.physicalAttributes || "",
        clothingDescription: report.clothingDescription || "",
        medicalConditions: report.medicalConditions || "",
        contactName: report.contactName || "",
        contactPhone: report.contactPhone || "",
        contactEmail: report.contactEmail || "",
        additionalInfo: report.additionalInfo || "",
        status: report.status || "", // Added status field
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch report details. Please try again later.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUpdating(true);

    try {
      // First update the main report data
      await axios.put(`http://localhost:8080/api/reports/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      // If user is admin and status was changed, update the status separately
      if (currentUser.roles.includes("ROLE_ADMIN") && formData.status) {
        await axios.put(
          `http://localhost:8080/api/reports/${id}/status`,
          { status: formData.status },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
      }

      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(`/reports/${id}`);
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update report. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading report data...</div>;
  }

  return (
    <div className="report-form-container">
      <div className="report-form-header">
        <h1>Update Report</h1>
        <p>Update information about the missing person</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && (
        <div className="alert alert-success">Report updated successfully!</div>
      )}

      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-section">
          <h2>Missing Person Information</h2>

          {/* Admin-only status field */}
          {currentUser.roles.includes("ROLE_ADMIN") && (
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="MISSING">Missing</option>
                <option value="FOUND">Found</option>
                <option value="INVESTIGATING">Investigating</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          )}

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
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
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
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/reports/${id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={updating}>
            {updating ? "Updating..." : "Update Report"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReport;
