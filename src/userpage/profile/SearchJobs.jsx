import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
  getDoc,
  doc
} from "firebase/firestore";
import { auth, db } from "../../firebase";

function SearchJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🔥 Fetch Jobs Posted in Last 30 Days
  const fetchJobs = async () => {
    try {
      const date = new Date();
      date.setDate(date.getDate() - 30);

      const q = query(
        collection(db, "jobs"),
        where("createdAt", ">=", Timestamp.fromDate(date))
      );

      const snapshot = await getDocs(q);

      setJobs(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );

    } catch (error) {
      console.error(error);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Apply Job Function
  const applyJob = async (job) => {

    const user = auth.currentUser;

    if (!user) {
      alert("Please login");
      return;
    }

    try {

      // 👉 Fetch user profile
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        alert("Profile not found");
        return;
      }

      const userData = userDoc.data();

      // 👉 Resume check
      if (!userData.resume) {
        alert("Please upload resume before applying");
        return;
      }

      // 👉 Save Application
      await addDoc(collection(db, "applications"), {
        userId: user.uid,
        jobId: job.id,
        employerId: job.employerId, 
        resume: userData.resume,
        candidateName: userData.name || "Candidate",
        candidateEmail: userData.email || "",
        status: "Applied",
        appliedAt: Timestamp.now()
      });

      alert("Applied Successfully ✅");

    } catch (error) {
      console.log(error);
      alert("Application Failed");
    }
  };

  // 🔥 Search Filter Logic
  const filteredJobs = jobs.filter(job => {

    const term = searchTerm.toLowerCase();

    return (
      job.title?.toLowerCase().includes(term) ||
      job.companyName?.toLowerCase().includes(term) ||
      job.location?.toLowerCase().includes(term) ||
      job.description?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page-container">

  <h2 className="page-title">Search Jobs 🔍</h2>

  <input
    type="text"
    className="search-box"
    placeholder="Search jobs..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <div className="job-grid">
    {filteredJobs.map(job => (
      <div key={job.id} className="job-card">

        <h3 className="job-title">{job.title}</h3>

        <p className="card-text"><b>Company:</b> {job.companyName}</p>
        <p className="card-text"><b>Location:</b> {job.location}</p>
        <p className="card-text"><b>Skills:</b> {job.skills}</p>
        <p className="card-text"><b>Salary:</b> {job.salary}</p>
        <p className="card-text"><b>Type:</b> {job.jobType}</p>

        <button
          className="primary-btn"
          onClick={() => applyJob(job)}
        >
          Apply Now
        </button>

      </div>
    ))}
  </div>
</div>

  );
}

export default SearchJobs;