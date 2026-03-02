import { useState, useEffect } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../Components/Header";
import RecommendedJobs from "./profile/RecommendedJobs";
import JobInteraction from "./profile/JobInteraction";
import Applications from "./profile/Applications";
import Interviews from "./profile/Interviews";
import "./user.css";

function UserDashboard() {

  const [activeSection, setActiveSection] = useState("recommended");
  const [recentJobs, setRecentJobs] = useState([]);

  // 🔥 Fetch Last 10 Days Jobs
  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const date = new Date();
        date.setDate(date.getDate() - 10);

        const q = query(
          collection(db, "jobs"),
          where("createdAt", ">=", Timestamp.fromDate(date))
        );

        const snapshot = await getDocs(q);

        const jobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setRecentJobs(jobs);

      } catch (error) {
        console.log(error);
      }
    };

    fetchRecentJobs();
  }, []);

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Welcome to JobFinder Dashboard 🎉
      </h1>

      <p>Login successful</p>

      {/* 🔥 AUTO SCROLL SECTION */}
      <div className="auto-scroll-wrapper">
        <div className="auto-scroll-content">
          {recentJobs.map(job => (
            <span key={job.id} className="scroll-item">
              {job.title} | {job.companyName} | {job.location} &nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <Header />

      {/* Dashboard Navigation */}
      <div className="dashboard-nav">
        <button onClick={() => setActiveSection("recommended")}>
          Recommended Jobs
        </button>

        <button onClick={() => setActiveSection("jobs")}>
          Job Interaction
        </button>

        <button onClick={() => setActiveSection("applications")}>
          Applications
        </button>

        <button onClick={() => setActiveSection("interviews")}>
          Interviews
        </button>
      </div>

      {/* Sections */}
      {activeSection === "recommended" && <RecommendedJobs />}
      {activeSection === "jobs" && <JobInteraction />}
      {activeSection === "applications" && <Applications />}
      {activeSection === "interviews" && <Interviews />}

    </div>
  );
}

export default UserDashboard;