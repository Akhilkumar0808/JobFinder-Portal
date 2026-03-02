function AdminHome() {
  return (
    <div className="admin-home">
      
      <h1 className="dashboard-heading">Welcome Admin 👋</h1>
      <p className="dashboard-subtext">
        Here is the overview of your platform activity.
      </p>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>1,245</p>
        </div>

        <div className="stat-card">
          <h3>Total Employers</h3>
          <p>320</p>
        </div>

        <div className="stat-card">
          <h3>Active Jobs</h3>
          <p>540</p>
        </div>

        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p>18</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>✔ User Akhil registered</li>
          <li>✔ Employer Infosys posted a job</li>
          <li>✔ 3 jobs pending approval</li>
          <li>✔ 5 new applications received</li>
        </ul>
      </div>

    </div>
  );
}

export default AdminHome;