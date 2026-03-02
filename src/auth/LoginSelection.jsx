import { useNavigate } from "react-router-dom";
import "./loginselection.css";

function LoginSelection() {
  const navigate = useNavigate();

  return (
    <div className="login-container">

      {/* 🔵 Top Right Admin Button */}
      <div className="admin-top">
        <button 
          className="admin-square"
          onClick={() => navigate("/admin-login")}
        >
          Admin
        </button>
      </div>

      {/* 🟢 Center Box */}
      <div className="login-box">
        <h2>Select Login Type</h2>

        <button 
          className="employer-btn"
          onClick={() => navigate("/employer-login")}
        >
          Employer Login
        </button>

        <button 
          className="user-btn"
          onClick={() => navigate("/user-login")}
        >
          User Login
        </button>

      </div>
    </div>
  );
}

export default LoginSelection;