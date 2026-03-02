import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { auth,db } from "../../firebase";

function JobInteraction() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const snapshot = await getDocs(collection(db, "jobs"));

    const jobsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setJobs(jobsList);
  };

  // ⭐ Apply Job
  const applyJob = async (jobId) => {

    const user = auth.currentUser;
    if (!user) {
      alert("Please login");
      return;
    }

    // Prevent duplicate apply
    const q = query(
      collection(db, "applications"),
      where("userId", "==", user.uid),
      where("jobId", "==", jobId)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert("Already Applied");
      return;
    }

    await addDoc(collection(db, "applications"), {
      userId: user.uid,
      jobId,
      status: "Applied",
      appliedAt: new Date()
    });

    alert("Applied Successfully ✅");
  };

  return (
    <div className="page-container">
  <h2 className="page-title">Job Interaction</h2>

  <div className="job-grid">
    {jobs.map(job => (
      <div key={job.id} className="job-card">

        <h3 className="job-title">{job.title}</h3>

        <p className="card-text">{job.companyName}</p>
        <p className="card-text">{job.location}</p>

        <button
          className="primary-btn"
          onClick={() => applyJob(job.id)}
        >
          Apply
        </button>

      </div>
    ))}
  </div>
</div>

  );
}

export default JobInteraction;
