import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav style={{ padding: "15px", background: "#222", color: "#fff" }}>
      <Link to="/admin/dashboard" style={{ color: "#fff", marginRight: "15px" }}>
        Dashboard
      </Link>
      <Link to="/admin/users" style={{ color: "#fff", marginRight: "15px" }}>
        Users
      </Link>
      <Link to="/admin/employers" style={{ color: "#fff", marginRight: "15px" }}>
        Employers
      </Link>
      <Link to="/admin/jobs" style={{ color: "#fff", marginRight: "15px" }}>
        Jobs
      </Link>
      <Link to="/admin/analytics" style={{ color: "#fff" }}>
        Analytics
      </Link>
    </nav>
  );
};

export default AdminNavbar;
