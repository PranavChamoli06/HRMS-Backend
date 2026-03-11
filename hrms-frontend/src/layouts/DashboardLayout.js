import { Link, useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {

  const confirmLogout = window.confirm("Are you sure you want to logout?");

  if (confirmLogout) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

};

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#2c3e50",
          color: "white",
          padding: "20px"
        }}
      >

        <h3>HRMS</h3>

        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Role: {role}
        </p>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>

          {(role === "ADMIN" || role === "MANAGER") && (
            <Link to="/dashboard" style={{ color: "white" }}>
              Dashboard
            </Link>
          )}

          <Link to="/reservations" style={{ color: "white" }}>
            Reservations
          </Link>

          {role === "ADMIN" && (
            <Link to="/admin" style={{ color: "white" }}>
              Admin
            </Link>
          )}

        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "40px",
            padding: "10px",
            background: "#e74c3c",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>

    </div>
  );
}

export default DashboardLayout;