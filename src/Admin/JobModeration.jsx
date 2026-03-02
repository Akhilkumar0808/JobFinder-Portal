import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function JobModeration() {

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const snapshot = await getDocs(collection(db, "jobs"));

    const jobList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ Update without full refetch
  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "jobs", id), { status: newStatus });

    // 🔥 Update locally (no full reload)
    setJobs(prev =>
      prev.map(job =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  return (
    <div className="job-moderation">

      <h2 className="page-title">Job Moderation</h2>

      <div className="jobs-container">

        {jobs.map(job => {

          const status = job.status || "pending";

          return (
            <div key={job.id} className="job-card">

              <div className="job-header">
                <h3>{job.title}</h3>

                <span className={`status-badge ${status}`}>
                  {status}
                </span>
              </div>

              {/* 🔥 Additional Details */}
              <p><b>Skills:</b> {job.skills || "Not mentioned"}</p>

              <p>
                <b>Posted On:</b>{" "}
                {job.createdAt
                  ? job.createdAt.toDate().toLocaleString()
                  : "N/A"}
              </p>

              {/* <p><b>Employer Email:</b> {job.employerEmail || "N/A"}</p> */}

              <p><b>Company:</b> {job.companyName || "N/A"}</p>

              <div className="job-actions">

                {status !== "approved" && (
                  <button
                    className="approve-btn"
                    onClick={() => updateStatus(job.id, "approved")}
                  >
                    Approve
                  </button>
                )}

                {status !== "rejected" && (
                  <button
                    className="reject-btn"
                    onClick={() => updateStatus(job.id, "rejected")}
                  >
                    Reject
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default JobModeration;