import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./portal.css";

function JobPortal() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/select-login");   // your LoginSelection route
    }, 5000); // 1 second

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1 className="logo">JobFinder</h1>
      <p>Your Career Starts Here 🚀</p>
    </div>
  );
}

export default JobPortal;