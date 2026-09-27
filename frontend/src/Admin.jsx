import { useEffect, useState } from "react";
// ==================================================
// ADMIN DASHBOARD
// GrabTechie internal management panel
// ==================================================

function Admin() {
  // ==========================================
  // ADMIN LOGIN STATE
  // ==========================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  // ==========================================
// CUSTOMER REQUEST DATA
// ==========================================

const [customerRequests, setCustomerRequests] = useState([]);
const [customerRequestsLoading, setCustomerRequestsLoading] = useState(false);
  
// ==========================================
// DEVELOPER APPLICATION DATA
// ==========================================

const [applications, setApplications] = useState([]);
const [applicationsLoading, setApplicationsLoading] = useState(false);
const [applicationsError, setApplicationsError] = useState("");
  // ==========================================
  // HANDLE ADMIN LOGIN
  // ==========================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoginError("");

    try {
      const body = new URLSearchParams();

      body.append("username", email);
      body.append("password", password);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail || "Invalid login credentials."
        );
      }

      sessionStorage.setItem(
        "admin_token",
        result.access_token
      );

      setIsLoggedIn(true);
      // ==========================================


    } catch (error) {
      console.error("Admin login error:", error);

      setLoginError(
        "Invalid admin email or password."
      );
    }
  };
// ==========================================
// LOAD DEVELOPER APPLICATIONS
// ==========================================

useEffect(() => {
  if (!isLoggedIn) {
    return;
  }

  const loadApplications = async () => {
    setApplicationsLoading(true);
    setApplicationsError("");

    try {
      const token = sessionStorage.getItem("admin_token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/developer-applications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail || "Failed to load applications."
        );
      }

      setApplications(result.applications || []);

    } catch (error) {
      console.error(
        "Developer applications error:",
        error
      );

      setApplicationsError(
        "Unable to load developer applications."
      );

    } finally {
      setApplicationsLoading(false);
    }
  };

  loadApplications();
}, [isLoggedIn]);
// ==========================================
// LOAD CUSTOMER REQUESTS
// ==========================================

useEffect(() => {
  if (!isLoggedIn) {
    return;
  }

  const loadCustomerRequests = async () => {
    setCustomerRequestsLoading(true);

    try {
      const token = sessionStorage.getItem("admin_token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact-requests`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail || "Failed to load customer requests."
        );
      }

      setCustomerRequests(result.requests || []);

    } catch (error) {
      console.error(
        "Customer requests error:",
        error
      );

    } finally {
      setCustomerRequestsLoading(false);
    }
  };

  loadCustomerRequests();

}, [isLoggedIn]);
// ==========================================
// DEVELOPER APPLICATION COUNTS
// ==========================================

const pendingDevelopers = applications.filter(
  (application) => application.status === "pending"
).length;

const approvedDevelopers = applications.filter(
  (application) => application.status === "approved"
).length;
// ==========================================
// UPDATE DEVELOPER APPLICATION STATUS
// ==========================================

const handleStatusUpdate = async (
  applicationId,
  newStatus
) => {
  try {
    const token = sessionStorage.getItem("admin_token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/developer-applications/${applicationId}/status`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.detail || "Failed to update application."
      );
    }

    // Update the application immediately in the UI
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              status: newStatus,
            }
          : application
      )
    );

  } catch (error) {
    console.error(
      "Status update error:",
      error
    );

    alert(
      "Unable to update application status."
    );
  }
};
  // ==========================================
  // LOGIN SCREEN
  // ==========================================

  if (!isLoggedIn) {
    return (
      <div className="admin-page">

        <div className="glass-card admin-login-card">

          <span className="section-label">
            GrabTechie Admin
          </span>

          <h1>
            Admin Login
          </h1>

          <p>
            Sign in to manage developer applications
            and customer requests.
          </p>

          <form
            className="contact-form"
            onSubmit={handleLogin}
          >

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

            <button
              type="submit"
              className="primary-button"
            >
              Login to Dashboard →
            </button>

            {loginError && (
              <p className="form-status">
                {loginError}
              </p>
            )}

          </form>

        </div>

      </div>
    );
  }

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================

  return (
    <div className="admin-page">

      {/* ==========================================
          ADMIN HEADER
          ========================================== */}

      <header className="admin-header">

        <div>
          <span className="section-label">
            GrabTechie Admin
          </span>

          <h1>
            Dashboard
          </h1>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            sessionStorage.removeItem("admin_token");
            setIsLoggedIn(false);
          }}
        >
          Logout
        </button>

      </header>


      {/* ==========================================
          DASHBOARD OVERVIEW
          ========================================== */}

      <section className="admin-stats">

        <div className="glass-card stat-card">
          <strong>{pendingDevelopers}</strong>          
          <span>Pending Developers</span>
        </div>

        <div className="glass-card stat-card">
          <strong>{approvedDevelopers}</strong>
          <span>Approved Developers</span>
        </div>
<div className="glass-card stat-card">
  <strong>
    {customerRequestsLoading
      ? "..."
      : customerRequests.length}
  </strong>

  <span>Customer Requests</span>
</div>
        
      </section>


      {/* ==========================================
          DEVELOPER APPLICATIONS
          ========================================== */}

      <section className="admin-section">

  <span className="section-label">
    Developer Network
  </span>

  <h2>
    Developer Applications
  </h2>


  {/* ==========================================
      LOADING STATE
      ========================================== */}

  {applicationsLoading && (
    <div className="glass-card admin-empty-state">
      Loading developer applications...
    </div>
  )}


  {/* ==========================================
      ERROR STATE
      ========================================== */}

  {applicationsError && (
    <div className="glass-card admin-empty-state">
      {applicationsError}
    </div>
  )}


  {/* ==========================================
      DEVELOPER APPLICATION LIST
      ========================================== */}

  {!applicationsLoading &&
    !applicationsError &&
    applications.length === 0 && (
      <div className="glass-card admin-empty-state">
        No developer applications found.
      </div>
    )}


  {!applicationsLoading &&
    !applicationsError &&
    applications.length > 0 && (
      <div className="admin-applications-list">

        {applications.map((application) => (
  <div
    className="glass-card admin-application-card"
    key={application.id}
  >

    {/* ==========================================
        DEVELOPER CARD HEADER
        ========================================== */}

    <div className="admin-card-header">

      <div>
        <span className="section-label">
          Developer #{application.id}
        </span>

        <h3>
          {application.name}
        </h3>
      </div>

      {/* Status badge */}
      <span
        className={`admin-status-badge ${application.status}`}
      >
        {application.status}
      </span>

    </div>


    {/* ==========================================
        DEVELOPER DETAILS
        ========================================== */}

    <div className="admin-card-details">

      <p>
        <strong>Email</strong>
        <span>{application.email}</span>
      </p>

      <p>
        <strong>Phone</strong>
        <span>{application.phone}</span>
      </p>

      <p>
        <strong>Primary Skill</strong>
        <span>{application.primary_skill}</span>
      </p>

      <p>
        <strong>Technologies</strong>
        <span>
          {application.technologies || "Not provided"}
        </span>
      </p>

      <p>
        <strong>Experience</strong>
        <span>{application.experience}</span>
      </p>

    </div>


    {/* ==========================================
        PORTFOLIO
        ========================================== */}

    {application.portfolio_url && (
      <a
        href={application.portfolio_url}
        target="_blank"
        rel="noreferrer"
        className="admin-portfolio-link"
      >
        View Portfolio →
      </a>
    )}


    {/* ==========================================
        APPLICATION ACTIONS
        ========================================== */}

    {application.status === "pending" && (
      <div className="admin-application-actions">

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            handleStatusUpdate(
              application.id,
              "approved"
            )
          }
        >
          Approve ✓
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            handleStatusUpdate(
              application.id,
              "rejected"
            )
          }
        >
          Reject ✕
        </button>

      </div>
    )}

  </div>
))}

      </div>
    )}

</section>
{/* ==========================================
    CUSTOMER REQUESTS
    Shows real customer contact requests
    ========================================== */}
<section className="admin-section">

  <span className="section-label">
    Customer Requests
  </span>

  <h2>
    Recent Customer Requests
  </h2>


  {/* ==========================================
      LOADING STATE
      ========================================== */}

  {customerRequestsLoading && (
    <div className="glass-card admin-empty-state">
      Loading customer requests...
    </div>
  )}


  {/* ==========================================
      EMPTY STATE
      ========================================== */}

  {!customerRequestsLoading &&
    customerRequests.length === 0 && (
      <div className="glass-card admin-empty-state">
        No customer requests found.
      </div>
    )}


  {/* ==========================================
      CUSTOMER REQUEST LIST
      ========================================== */}

  {!customerRequestsLoading &&
    customerRequests.length > 0 && (
      <div className="admin-applications-list">

        {customerRequests.map((request) => (

          <div
            className="glass-card admin-application-card"
            key={request.id}
          >

            <h3>
              {request.name}
            </h3>

            <p>
              <strong>Email:</strong> {request.email}
            </p>

            <p>
              <strong>Phone:</strong> {request.phone}
            </p>

            <p>
              <strong>Company:</strong>{" "}
              {request.company || "Not provided"}
            </p>

            <p>
              <strong>Service:</strong> {request.service}
            </p>

            <p>
              <strong>Message:</strong> {request.message}
            </p>

            <p>
              <strong>Received:</strong>{" "}
              {new Date(
                request.created_at
              ).toLocaleString()}
            </p>

          </div>

        ))}

      </div>
    )}

</section>
    </div>
  );
}

export default Admin;