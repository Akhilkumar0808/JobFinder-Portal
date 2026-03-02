import { useEffect, useState } from "react";
import { auth,db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  query,
  where
} from "firebase/firestore";

function RecommendedJobs() {

  const [jobs, setJobs] = useState([]);
  const [loadingJobId, setLoadingJobId] = useState(null);

  // 👉 Fetch Jobs
  const fetchJobs = async () => {
    try {
      const snapshot = await getDocs(collection(db, "jobs"));

      const jobsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setJobs(jobsList);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 👉 Apply Job
  const applyJob = async (job) => {

    try {

      const user = auth.currentUser;

      if (!user) {
        alert("Login required");
        return;
      }

      setLoadingJobId(job.id);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("Complete profile first");
        setLoadingJobId(null);
        return;
      }

      const userData = userSnap.data();

      if (!userData.resume) {
        alert("Upload resume first");
        setLoadingJobId(null);
        return;
      }

      // ⭐ Prevent duplicate apply
      const q = query(
        collection(db, "applications"),
        where("jobId", "==", job.id),
        where("userId", "==", user.uid)
      );

      const existing = await getDocs(q);

      if (!existing.empty) {
        alert("Already applied");
        setLoadingJobId(null);
        return;
      }

      // ⭐ Extract nested data safely
      const personal = userData.personalInfo || {};
      const professional = userData.professionalInfo || {};

      // ⭐ Save Application
      await addDoc(collection(db, "applications"), {

        jobId: job.id,
        employerId: job.employerId || "",
        userId: user.uid,

        name: personal.fullName || "Not Provided",
        location: personal.city || "Not Provided",
        phone: personal.phone || "Not Provided",
        skills: professional.skills || "Not Provided",
        education: professional.education || "Not Provided",
        email:personal.email || user.email || "Not Provided",
        resume: userData.resume || "",

        jobTitle: job.title,
        companyName: job.companyName,

        status: "Applied",
        appliedAt: serverTimestamp()
      });

      alert("Application Sent 🎉");

    } catch (error) {
      console.log(error);
      alert("Application failed");
    }

    setLoadingJobId(null);
  };

  return (
    <div className="job-card">
      <h2>Recommended Jobs</h2>

      {jobs.length === 0 ? (
        <p>No Jobs Available</p>
      ) : (
        jobs.map(job => (
          <div
            key={job.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px 0"
            }}
          >

            <h3 className="job-title">{job.title}</h3>

            <p className="job-info"><b>Company:</b> {job.companyName}</p>
            <p className="job-info"><b>Location:</b> {job.location}</p>
            <p className="job-info"><b>Salary:</b> {job.salary}</p>
            <p className="job-info"><b>Experience:</b> {job.experience}</p>
            <p><b>Type:</b> {job.jobType}</p>
            <p>{job.description}</p>

            <button className="apply-btn"
              onClick={() => applyJob(job)}
              disabled={loadingJobId === job.id}
            >
              {loadingJobId === job.id ? "Applying..." : "Apply Job"}
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default RecommendedJobs;
