import { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { auth,db } from "../../firebase";

function Interviews() {

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {

    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "interviews"),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    setInterviews(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  };

  // User Accept Interview
  const acceptInterview = async (id) => {

    await updateDoc(doc(db, "interviews", id), {
      candidateResponse: "Accepted"
    });

    fetchInterviews();
  };

  return (
    <div>

      <h2>My Interviews</h2>

    
         {interviews.map(interview => (
  <div key={interview.id} className="interview-card">

    
    <h3>{interview.companyName}</h3>
    <p><b>Role:</b> {interview.jobTitle}</p>

    <p><b>Date:</b> {interview.interviewDate}</p>
    <p><b>Time:</b> {interview.interviewTime}</p>

    <p><b>Location:</b> {interview.interviewLocation}</p>
    <p><b>Employer Contact:</b> {interview.contactInfo}</p>
    <p><b>Interviewer:</b> {interview.interviewerName}</p>



    {interview.requiredDocuments && (
      <p><b>Required Documents:</b> {interview.requiredDocuments}</p>
    )}

    <p><b>Status:</b> {interview.status}</p>
          {interview.candidateResponse !== "Accepted" && (
            <button onClick={() => acceptInterview(interview.id)}>
              Accept Interview
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default Interviews;
