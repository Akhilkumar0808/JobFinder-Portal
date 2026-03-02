import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  Timestamp
} from "firebase/firestore";
import { auth,db } from "../firebase";
import "./employer.css";

function EmployerApplications() {

  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  const [interviewData, setInterviewData] = useState({
    date: "",
    time: "",
    location: "",
    contact: "",
    interviewer: "",
    requiredDocuments: ""
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ Fetch Applications
  const fetchApplications = async () => {

    const employer = auth.currentUser;
    if (!employer) return;

    try {

      const q = query(
        collection(db, "applications"),
        where("employerId", "==", employer.uid)
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setApplications(list);

    } catch (error) {
      console.log(error);
    }
  };

  // ❌ Reject Candidate
  const rejectCandidate = async (id) => {

    if (!window.confirm("Reject this candidate?")) return;

    await deleteDoc(doc(db, "applications", id));

    alert("Application Rejected ❌");
    fetchApplications();
  };

  // ✅ Accept Candidate + Create Interview
  const acceptCandidate = async () => {

    if (!selectedApp) return;

    // ⭐ Validation
    if (
      !interviewData.date ||
      !interviewData.time ||
      !interviewData.location ||
      !interviewData.contact ||
      !interviewData.interviewer
    ) {
      alert("Please fill all interview details");
      return;
    }

    try {

      const employer = auth.currentUser;

      // ⭐ Update Application Status
      await updateDoc(
        doc(db, "applications", selectedApp.id),
        { status: "Accepted" }
      );

      // ⭐ Save Interview Record
      await addDoc(collection(db, "interviews"), {

        employerId: employer.uid,
        userId: selectedApp.userId,

        candidateName: selectedApp.candidateName || "Candidate",
        candidateEmail: selectedApp.candidateEmail || "",

        companyName: selectedApp.companyName || "",
        jobTitle: selectedApp.jobTitle || "",

        interviewDate: interviewData.date,
        interviewTime: interviewData.time,
        interviewLocation: interviewData.location,
        contactInfo: interviewData.contact,
        interviewerName: interviewData.interviewer,
        requiredDocuments: interviewData.requiredDocuments || "",

        status: "Scheduled",
        createdAt: Timestamp.now()
      });

      alert("Interview Scheduled ✅");

      // ⭐ Reset State
      setSelectedApp(null);
      setInterviewData({
        date: "",
        time: "",
        location: "",
        contact: "",
        interviewer: "",
        requiredDocuments: ""
      });

      fetchApplications();

    } catch (error) {
      console.log(error);
      alert("Failed to schedule interview");
    }
  };

  return (
    <div className="dashboard-container">

      <h2 className="page-title">Candidate Applications</h2>

      {applications.length === 0 ? (
        <p>No Applications Yet</p>
      ) : (
        <div className="application-grid">

          {/* {applications.map(app => (
            <div key={app.id} className="application-card">

              <h3>{app.candidateName || "Candidate"}</h3>

              <p><strong>Status:</strong> {app.status || "Applied"}</p> */}
              {applications.map(app => (
        <div key={app.id} className="application-card">

         <h3>Name: {app.name}</h3>
          <p>Email: {app.email}</p> 
         <p>Phone: {app.phone}</p>
         <p>Job: {app.jobTitle}</p>

    <p>
      Status: {app.status ? app.status : "Applied"}
    </p>

              {app.resume && (
                <a href={app.resume} target="_blank" rel="noreferrer">
                  View Resume
                </a>
              )}

              <div style={{ marginTop: 10 }}>
                <button onClick={() => setSelectedApp(app)}>
                  Accept
                </button>

                <button onClick={() => rejectCandidate(app.id)}>
                  Reject
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* ⭐ Interview Popup */}
      {selectedApp && (
        <div className="popup">

          <h3>Schedule Interview</h3>

          <input
            type="date"
            value={interviewData.date}
            onChange={(e) =>
              setInterviewData({ ...interviewData, date: e.target.value })
            }
          />

          <input
            type="time"
            value={interviewData.time}
            onChange={(e) =>
              setInterviewData({ ...interviewData, time: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={interviewData.location}
            onChange={(e) =>
              setInterviewData({ ...interviewData, location: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Contact Info"
            value={interviewData.contact}
            onChange={(e) =>
              setInterviewData({ ...interviewData, contact: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Interviewer Name"
            value={interviewData.interviewer}
            onChange={(e) =>
              setInterviewData({ ...interviewData, interviewer: e.target.value })
            }
          />

          <textarea
            placeholder="Required Documents"
            value={interviewData.requiredDocuments}
            onChange={(e) =>
              setInterviewData({
                ...interviewData,
                requiredDocuments: e.target.value
              })
            }
          />

          <br /><br />

          <button onClick={acceptCandidate}>
            Confirm Interview
          </button>

          <button onClick={() => setSelectedApp(null)}>
            Cancel
          </button>

        </div>
      )}

    </div>
  );
}

export default EmployerApplications;

