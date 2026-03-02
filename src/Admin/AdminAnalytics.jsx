import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
function AdminAnalytics() {
  const [stats, setStats] = useState({
    users: 0,
    employers: 0,
    jobs: 0,
    applications: 0
  });

  const fetchStats = async () => {
    const users = await getDocs(collection(db, "users"));
    const employers = await getDocs(collection(db, "employers"));
    const jobs = await getDocs(collection(db, "jobs"));
    const applications = await getDocs(collection(db, "applications"));

    setStats({
      users: users.size,
      employers: employers.size,
      jobs: jobs.size,
      applications: applications.size
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);


return (
  <div className="analytics-container">
    <h2 className="page-title">Analytics Dashboard</h2>

    <div className="analytics-grid">
      <div className="analytics-card">
        <h3>Total Users</h3>
        <p>{stats.users}</p>
      </div>

      <div className="analytics-card">
        <h3>Total Employers</h3>
        <p>{stats.employers}</p>
      </div>

      <div className="analytics-card">
        <h3>Total Jobs</h3>
        <p>{stats.jobs}</p>
      </div>

      <div className="analytics-card">
        <h3>Total Applications</h3>
        <p>{stats.applications}</p>
      </div>
    </div>
  </div>
);
}

export default AdminAnalytics;
