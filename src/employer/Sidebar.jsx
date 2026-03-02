
import "./employer.css";

export default function Sidebar({ setActiveTab }) {
  return (
    <div className="sidebar">

      <h2 className="sidebar-title">Employer Panel</h2>

      <button 
        className="sidebar-btn"
        onClick={() => setActiveTab("profile")}
      >
        Company Profile
      </button>

      <button 
        className="sidebar-btn"
        onClick={() => setActiveTab("postjob")}
      >
        Post Job
      </button>

      <button 
        className="sidebar-btn"
        onClick={() => setActiveTab("jobs")}
      >
        Job List
      </button>

      <button 
        className="sidebar-btn"
        onClick={() => setActiveTab("applications")}
      >
        Applications
      </button>
      {/* <li onClick={() => setActiveTab("interviews")}>
      Interviews
        </li> */}
    <button 
        className="sidebar-btn"
        onClick={() => setActiveTab("interviews")}
      >
        Interviews
      </button>

    </div>
  );
}
