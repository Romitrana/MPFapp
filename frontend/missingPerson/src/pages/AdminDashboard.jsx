// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import axios from "axios"
// import "../styles/Dashboard.css"

// const AdminDashboard = () => {
//   const [reports, setReports] = useState([])
//   const [filteredReports, setFilteredReports] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const { currentUser } = useAuth()

//   useEffect(() => {
//     fetchReports()
//   }, [])

//   useEffect(() => {
//     // Filter reports based on search term and status
//     let filtered = reports

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (report) =>
//           report.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           report.lastSeenLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (report.reportedBy && report.reportedBy.username.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//     }

//     if (statusFilter !== "all") {
//       filtered = filtered.filter((report) => report.status === statusFilter.toUpperCase())
//     }

//     setFilteredReports(filtered)
//   }, [searchTerm, statusFilter, reports])

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/reports/all", {
//         headers: {
//           Authorization: `Bearer ${currentUser.token}`,
//         },
//       })
//       setReports(response.data)
//       setFilteredReports(response.data)
//       setLoading(false)
//     } catch (err) {
//       setError("Failed to fetch reports. Please try again later.")
//       setLoading(false)
//     }
//   }

//   const updateReportStatus = async (reportId, newStatus) => {
//     try {
//       await axios.put(
//         `http://localhost:8080/api/reports/${reportId}/status`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//         },
//       )

//       // Update local state
//       const updatedReports = reports.map((report) =>
//         report.id === reportId ? { ...report, status: newStatus } : report,
//       )
//       setReports(updatedReports)
//     } catch (err) {
//       setError("Failed to update report status. Please try again.")
//     }
//   }

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "MISSING":
//         return "badge-danger"
//       case "FOUND":
//         return "badge-success"
//       case "UNDER_PROCESS":
//         return "badge-warning"
//       default:
//         return "badge-secondary"
//     }
//   }

//   const getStatusText = (status) => {
//     switch (status) {
//       case "MISSING":
//         return "Missing"
//       case "FOUND":
//         return "Found"
//       case "UNDER_PROCESS":
//         return "Under Process"
//       default:
//         return "Unknown"
//     }
//   }

//   return (
//     <div className="dashboard admin-dashboard">
//       <div className="dashboard-header">
//         <h1>Admin Dashboard</h1>
//         <p>Manage all missing person reports</p>
//       </div>

//       <div className="stats-cards">
//         <div className="stat-card">
//           <h3>Total Reports</h3>
//           <div className="stat-value">{reports.length}</div>
//         </div>
//         <div className="stat-card">
//           <h3>Missing</h3>
//           <div className="stat-value">{reports.filter((r) => r.status === "MISSING").length}</div>
//         </div>
//         <div className="stat-card">
//           <h3>Found</h3>
//           <div className="stat-value">{reports.filter((r) => r.status === "FOUND").length}</div>
//         </div>
//         <div className="stat-card">
//           <h3>Under Process</h3>
//           <div className="stat-value">{reports.filter((r) => r.status === "UNDER_PROCESS").length}</div>
//         </div>
//       </div>

//       {error && <div className="alert alert-error">{error}</div>}

//       <div className="search-filters">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search by name, location, or reporter..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <span className="search-icon">🔍</span>
//         </div>

//         <div className="filter-dropdown">
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             <option value="all">All Statuses</option>
//             <option value="missing">Missing</option>
//             <option value="found">Found</option>
//             <option value="under_process">Under Process</option>
//           </select>
//         </div>
//       </div>

//       <div className="tab-content">
//         {loading ? (
//           <div className="loading">Loading reports...</div>
//         ) : filteredReports.length === 0 ? (
//           <div className="empty-state">
//             <div className="empty-icon">📋</div>
//             <p>No reports found matching your criteria.</p>
//           </div>
//         ) : (
//           <div className="reports-list">
//             {filteredReports.map((report) => (
//               <div key={report.id} className="report-card">
//                 <div className="report-header">
//                   <div>
//                     <h3>{report.fullName}</h3>
//                     <p className="report-meta">
//                       Age: {report.age} • Reported by: {report.reportedBy ? report.reportedBy.username : "Unknown"} •
//                       Date: {new Date(report.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <span className={`badge ${getStatusBadgeClass(report.status)}`}>{getStatusText(report.status)}</span>
//                 </div>
//                 <div className="report-body">
//                   <p>
//                     <strong>Last seen:</strong> {new Date(report.lastSeenDate).toLocaleDateString()} at{" "}
//                     {report.lastSeenLocation}
//                   </p>
//                 </div>
//                 <div className="report-footer">
//                   <Link to={`/reports/${report.id}`} className="btn btn-outline">
//                     View Details
//                   </Link>
//                   <div className="status-dropdown">
//                     <select
//                       defaultValue={report.status}
//                       onChange={(e) => updateReportStatus(report.id, e.target.value)}
//                     >
//                       <option value="" disabled>
//                         Update Status
//                       </option>
//                       <option value="MISSING">Missing</option>
//                       <option value="FOUND">Found</option>
//                       <option value="UNDER_PROCESS">Under Process</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard

"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    // Filter reports based on search term and status
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.lastSeenLocation
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (report.reportedBy &&
            report.reportedBy.username
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (report) => report.status === statusFilter.toUpperCase()
      );
    }

    setFilteredReports(filtered);
  }, [searchTerm, statusFilter, reports]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/reports/all",
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setReports(response.data);
      setFilteredReports(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch reports. Please try again later.");
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/reports/${reportId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      // Update local state
      const updatedReports = reports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      );
      setReports(updatedReports);
    } catch (err) {
      setError("Failed to update report status. Please try again.");
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this report? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/reports/${reportId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      // Remove the deleted report from state
      setReports(reports.filter((report) => report.id !== reportId));
      setFilteredReports(
        filteredReports.filter((report) => report.id !== reportId)
      );
    } catch (err) {
      setError("Failed to delete report. Please try again.");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "MISSING":
        return "badge-danger";
      case "FOUND":
        return "badge-success";
      case "UNDER_PROCESS":
        return "badge-warning";
      default:
        return "badge-secondary";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "MISSING":
        return "Missing";
      case "FOUND":
        return "Found";
      case "UNDER_PROCESS":
        return "Under Process";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="dashboard admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all missing person reports</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <div className="stat-value">{reports.length}</div>
        </div>
        <div className="stat-card">
          <h3>Missing</h3>
          <div className="stat-value">
            {reports.filter((r) => r.status === "MISSING").length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Found</h3>
          <div className="stat-value">
            {reports.filter((r) => r.status === "FOUND").length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Under Process</h3>
          <div className="stat-value">
            {reports.filter((r) => r.status === "UNDER_PROCESS").length}
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="search-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, location, or reporter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="missing">Missing</option>
            <option value="found">Found</option>
            <option value="under_process">Under Process</option>
          </select>
        </div>
      </div>

      <div className="tab-content">
        {loading ? (
          <div className="loading">Loading reports...</div>
        ) : filteredReports.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No reports found matching your criteria.</p>
          </div>
        ) : (
          <div className="reports-list">
            {filteredReports.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div>
                    <h3>{report.fullName}</h3>
                    <p className="report-meta">
                      Age: {report.age} • Reported by:{" "}
                      {report.reportedBy
                        ? report.reportedBy.username
                        : "Unknown"}{" "}
                      • Date: {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`badge ${getStatusBadgeClass(report.status)}`}
                  >
                    {getStatusText(report.status)}
                  </span>
                </div>
                <div className="report-body">
                  <p>
                    <strong>Last seen:</strong>{" "}
                    {new Date(report.lastSeenDate).toLocaleDateString()} at{" "}
                    {report.lastSeenLocation}
                  </p>
                </div>
                <div className="report-footer">
                  <Link
                    to={`/reports/${report.id}`}
                    className="btn btn-outline"
                  >
                    View Details
                  </Link>
                  <div className="status-dropdown">
                    <select
                      value={report.status}
                      onChange={(e) =>
                        updateReportStatus(report.id, e.target.value)
                      }
                    >
                      <option value="MISSING">Missing</option>
                      <option value="FOUND">Found</option>
                      <option value="UNDER_PROCESS">Under Process</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
