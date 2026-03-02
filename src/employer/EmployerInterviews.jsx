import { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { auth,db } from "../firebase";
import "./employer.css";

function EmployerInterviews() {

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {

    const employer = auth.currentUser;
    if (!employer) return;

    const q = query(
      collection(db, "interviews"),
      where("employerId", "==", employer.uid)
    );

    const snapshot = await getDocs(q);

    // ⭐ Fetch user details
    const interviewData = await Promise.all(
      snapshot.docs.map(async (docSnap) => {

        const data = docSnap.data();

        let userName = "Not Provided";
        let userEmail = "Not Provided";
        let userPhone = "Not Provided";

        if (data.userId) {
          const userDoc = await getDoc(doc(db, "users", data.userId));

          if (userDoc.exists()) {
            const user = userDoc.data();

            const personal = user.personalInfo || {};

            userName = personal.fullName || "Not Provided";
            userPhone = personal.phone || "Not Provided";
            userEmail = user.email || "Not Provided";
          }
        }

        return {
          id: docSnap.id,
          ...data,
          userName,
          userEmail,
          userPhone
        };
      })
    );

    setInterviews(interviewData);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>

      <h2>Scheduled Interviews</h2>

      {interviews.map(interview => (
        <div key={interview.id} className="interview-card">

          <h3>{interview.userName}</h3>

          <p><b>Status:</b> {interview.status}</p>

          <p><b>Email:</b> {interview.userEmail}</p>
          <p><b>Phone:</b> {interview.userPhone}</p>

          <hr />

          <p><b>Job:</b> {interview.jobTitle}</p>
          <p><b>Date:</b> {interview.interviewDate}</p>
          <p><b>Time:</b> {interview.interviewTime}</p>
          <p><b>Location:</b> {interview.interviewLocation}</p>

          {interview.interviewDate === today && (
            <p style={{ color: "red" }}>
              Interview Today ⚠
            </p>
          )}

        </div>
      ))}

    </div>
  );
}

export default EmployerInterviews;
