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
    <div className="d-flex min-vh-100">

      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "220px" }}>

        <h3>HRMS</h3>

        <p className="small mt-2">
          Role: {role}
        </p>

        <nav className="d-flex flex-column mt-3">

          {(role === "ADMIN" || role === "MANAGER") && (
            <Link to="/dashboard" className="text-white text-decoration-none mb-2 p-2 rounded">
              Dashboard
            </Link>
          )}

            <Link to="/reservations" className="text-white text-decoration-none mb-2 p-2 rounded">
              Reservations
            </Link>

          {role === "ADMIN" && (
            <Link to="/admin" className="text-white text-decoration-none mb-2 p-2 rounded">
              Admin
            </Link>
          )}

        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn btn-danger mt-4 w-100"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="bg-white bg-opacity-75 p-4 rounded shadow">
          {children}
        </div>
      </div>

    </div>
  );
}

export default DashboardLayout;