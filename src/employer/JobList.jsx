import { useEffect, useState } from "react";
import { auth,db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import "./employer.css";

export default function JobList() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const user = auth.currentUser;

      const q = query(
        collection(db, "jobs"),
        where("employerId", "==", user.uid),
        orderBy("createdAt", "desc") // 🔥 Latest first
      );

      const snapshot = await getDocs(q);

      setJobs(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    };

    fetchJobs();
  }, []);


return (
  <div className="dashboard-container">

    <h2 className="page-title">Recent Posted Jobs</h2>

    <div className="job-grid">

      {jobs.map(job => (
        <div key={job.id} className="job-card">

          <h3>{job.title}</h3>

          <p><strong>Company:</strong> {job.companyName}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Experience:</strong> {job.experience}</p>
          <p><strong>Job Type:</strong> {job.jobType}</p>
          <p><strong>Skills:</strong> {job.skills}</p>
          <p><strong>Description:</strong> {job.description}</p>

          {job.jobLink && (
            <p>
              <strong>Application Link:</strong>{" "}
              <a href={job.jobLink} target="_blank" rel="noreferrer">
                Apply Here
              </a>
            </p>
          )}

          <p>
            <strong>Status:</strong> {job.status}
          </p>

          <p>
            <strong>Posted On:</strong>{" "}
            {job.createdAt
              ? job.createdAt.toDate().toLocaleString()
              : "Just now"}
          </p>

        </div>
      ))}

    </div>

  </div>
);
}