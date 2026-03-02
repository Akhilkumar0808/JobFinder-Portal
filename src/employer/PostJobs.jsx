// import React, { useState } from "react";

// const EmployerPostJobs = () => {
//   const [job, setJob] = useState({
//     title: "",
//     description: "",
//     location: "",
//     type: "Full-Time",
//     salary: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setJob({ ...job, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Job Posted:", job);
//     alert("Job posted successfully!");
//     setJob({ title: "", description: "", location: "", type: "Full-Time", salary: "" });
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "20px auto" }}>
//       <h2>Post a Job</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Job Title:</label>
//           <input type="text" name="title" value={job.title} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Job Description:</label>
//           <textarea name="description" value={job.description} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Location:</label>
//           <input type="text" name="location" value={job.location} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Job Type:</label>
//           <select name="type" value={job.type} onChange={handleChange}>
//             <option>Full-Time</option>
//             <option>Part-Time</option>
//             <option>Internship</option>
//           </select>
//         </div>
//         <div>
//           <label>Salary:</label>
//           <input type="text" name="salary" value={job.salary} onChange={handleChange} />
//         </div>
//         <button type="submit">Post Job</button>
//       </form>
//     </div>
//   );
// };

// export default EmployerPostJobs;
// import { useState } from "react";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

//  function PostJobs() {

//   const [job, setJob] = useState({
//     title: "",
//     companyName: "",
//     location: "",
//     salary: "",
//     experience: "",
//     jobType: "",
//     description: ""
//   });

//   const [loading, setLoading] = useState(false);

//   // 👉 Handle Input Change
//   const handleChange = (e) => {
//     setJob({ ...job, [e.target.name]: e.target.value });
//   };

//   // 👉 Post Job
//   const postJob = async () => {
//     const user = auth.currentUser;

//     if (!user) {
//       alert("Employer not logged in");
//       return;
//     }

//     // Basic Validation
//     if (!job.title || !job.location || !job.description) {
//       alert("Please fill required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       await addDoc(collection(db, "jobs"), {
//         ...job,
//         employerId: user.uid,
//         status: "Open",
//         createdAt: serverTimestamp()
//       });

//       alert("Job Posted Successfully 🎉");

//       // Reset Form
//       setJob({
//         title: "",
//         companyName: "",
//         location: "",
//         salary: "",
//         experience: "",
//         jobType: "",
//         description: ""
//       });

//     } catch (error) {
//       console.log(error);
//       alert("Error posting job");
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <h2>Post New Job</h2>

//       <input
//         name="title"
//         placeholder="Job Title"
//         value={job.title}
//         onChange={handleChange}
//       />

//       <input
//         name="companyName"
//         placeholder="Company Name"
//         value={job.companyName}
//         onChange={handleChange}
//       />

//       <input
//         name="location"
//         placeholder="Job Location"
//         value={job.location}
//         onChange={handleChange}
//       />

//       <input
//         name="salary"
//         placeholder="Salary"
//         value={job.salary}
//         onChange={handleChange}
//       />

//       <input
//         name="experience"
//         placeholder="Required Experience"
//         value={job.experience}
//         onChange={handleChange}
//       />

//       <select
//         name="jobType"
//         value={job.jobType}
//         onChange={handleChange}
//       >
//         <option value="">Select Job Type</option>
//         <option value="Full Time">Full Time</option>
//         <option value="Part Time">Part Time</option>
//         <option value="Internship">Internship</option>
//         <option value="Remote">Remote</option>
//       </select>

//       <textarea
//         name="description"
//         placeholder="Job Description"
//         value={job.description}
//         onChange={handleChange}
//       />

//       <br />

//       <button onClick={postJob} disabled={loading}>
//         {loading ? "Posting..." : "Post Job"}
//       </button>
//     </div>
//   );
// }
// export default PostJobs;
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth,db } from "../firebase";

function PostJobs() {

  const [job, setJob] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    skills:"",
    description: "",
    jobLink: ""   // ⭐ NEW FIELD
  });

  const [loading, setLoading] = useState(false);

  // 👉 Handle Input Change
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // 👉 Post Job
  const postJob = async () => {

    const user = auth.currentUser;

    if (!user) {
      alert("Employer not logged in");
      return;
    }

    // Validation
    if (!job.title || !job.location || !job.skills || !job.description) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "jobs"), {
        ...job,
        employerId: user.uid,
        status: "Open",
        createdAt: serverTimestamp()
      });

      alert("Job Posted Successfully 🎉");

      // Reset Form
      setJob({
        title: "",
        companyName: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "",
        skills:"",
        description: "",
        jobLink: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error posting job");
    }

    setLoading(false);
  };

//   return (
//     <div>
//       <h2>Post New Job</h2>

//       <input
//         name="title"
//         placeholder="Job Title"
//         value={job.title}
//         onChange={handleChange}
//       />

//       <input
//         name="companyName"
//         placeholder="Company Name"
//         value={job.companyName}
//         onChange={handleChange}
//       />

//       <input
//         name="location"
//         placeholder="Job Location"
//         value={job.location}
//         onChange={handleChange}
//       />
//       <input
//         name="skills"
//         placeholder=" skills"
//         value={job.skills}
//         onChange={handleChange}
//       />

//       <input
//         name="salary"
//         placeholder="Salary"
//         value={job.salary}
//         onChange={handleChange}
//       />

//       <input
//         name="experience"
//         placeholder="Required Experience"
//         value={job.experience}
//         onChange={handleChange}
//       />

//       <select
//         name="jobType"
//         value={job.jobType}
//         onChange={handleChange}
//       >
//         <option value="">Select Job Type</option>
//         <option value="Full Time">Full Time</option>
//         <option value="Part Time">Part Time</option>
//         <option value="Internship">Internship</option>
//         <option value="Remote">Remote</option>
//       </select>

//       <textarea
//         name="description"
//         placeholder="Job Description"
//         value={job.description}
//         onChange={handleChange}
//       />

//       {/* ⭐ NEW JOB LINK INPUT */}
//       <input
//         name="jobLink"
//         placeholder="Application Link (Optional)"
//         value={job.jobLink}
//         onChange={handleChange}
//       />

//       <br />

//       <button onClick={postJob} disabled={loading}>
//         {loading ? "Posting..." : "Post Job"}
//       </button>
//     </div>
//   );
// }
return (
  <div className="dashboard-container">

    <h2 className="page-title">Post New Job</h2>

    <div className="form-card">

      <input
        className="form-input"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
      />

      <input
        className="form-input"
        name="companyName"
        placeholder="Company Name"
        value={job.companyName}
        onChange={handleChange}
      />

      <input
        className="form-input"
        name="location"
        placeholder="Job Location"
        value={job.location}
        onChange={handleChange}
      />

      <input
        className="form-input"
        name="skills"
        placeholder="Skills Required"
        value={job.skills}
        onChange={handleChange}
      />

      <input
        className="form-input"
        name="salary"
        placeholder="Salary"
        value={job.salary}
        onChange={handleChange}
      />

      <input
        className="form-input"
        name="experience"
        placeholder="Required Experience"
        value={job.experience}
        onChange={handleChange}
      />

      <select
        className="form-input"
        name="jobType"
        value={job.jobType}
        onChange={handleChange}
      >
        <option value="">Select Job Type</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
      </select>

      <textarea
        className="form-textarea"
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
      />

      <input
        className="form-input"
        name="jobLink"
        placeholder="Application Link (Optional)"
        value={job.jobLink}
        onChange={handleChange}
      />

      <button
        className="primary-btn"
        onClick={postJob}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Job"}
      </button>

    </div>

  </div>
);
}
export default PostJobs;


