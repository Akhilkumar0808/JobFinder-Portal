import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function UserJobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));

      const jobList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setJobs(jobList);
    };

    fetchJobs();

  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs available</p>}

      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          
          <h3>{job.title}</h3>
          <p><b>Company:</b> {job.companyName}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Salary:</b> {job.salary}</p>
          <p><b>Experience:</b> {job.experience}</p>
          <p><b>Type:</b> {job.jobType}</p>
          <p>{job.description}</p>

        </div>
      ))}
    </div>
  );
}

export default UserJobs;
