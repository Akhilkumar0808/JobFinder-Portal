import { useState } from "react";
import UserVerification from "./UserVerification";
import EmployerVerification from "./EmployerVerification";
import JobModeration from "./JobModeration";
import AdminAnalytics from "./AdminAnalytics";
import AdminHome from "./AdminHome";

function AdminDashboard() {

  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <AdminHome />;
      case "users":
        return <UserVerification />;
      case "employers":
        return <EmployerVerification />;
      case "jobs":
        return <JobModeration />;
      case "analytics":
        return <AdminAnalytics />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div style={styles.dashboard}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.title}>Admin Panel</h2>

        <button 
          style={activeTab === "home" ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab("home")}
        >
          Dashboard
        </button>

        <button 
          style={activeTab === "users" ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>

        <button 
          style={activeTab === "employers" ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab("employers")}
        >
          Employers
        </button>

        <button 
          style={activeTab === "jobs" ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs
        </button>

        <button 
          style={activeTab === "analytics" ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>

      </div>

      {/* Content */}
      <div style={styles.main}>
        <div style={styles.card}>
          {renderContent()}
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;

const styles = {

  dashboard: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8"
  },

  sidebar: {
    width: "250px",
    background: "#1e293b",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  title: {
    color: "white",
    marginBottom: "20px"
  },

  btn: {
    padding: "10px",
    border: "none",
    background: "transparent",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: "6px"
  },

  activeBtn: {
    padding: "10px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: "6px"
  },

  main: {
    flex: 1,
    padding: "30px"
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  }

};