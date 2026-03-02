import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from "firebase/firestore";
import { auth,db } from "../../firebase";

function Applications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    const user = auth.currentUser;
    if (!user) return;

    try {

      // 👉 Get user applications
      const q = query(
        collection(db, "applications"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      // 👉 Fetch Job Details for each application
      const appList = await Promise.all(
        snapshot.docs.map(async (appDoc) => {

          const appData = appDoc.data();

          const jobRef = doc(db, "jobs", appData.jobId);
          const jobSnap = await getDoc(jobRef);

          return {
            id: appDoc.id,
            status: appData.status,
            job: jobSnap.exists() ? jobSnap.data() : null
          };

        })
      );

      setApplications(appList);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">

  <h2 className="page-title">My Applications</h2>

  {applications.length === 0 ? (
    <p>No Applications Yet</p>
  ) : (

    <div className="application-grid">
      {applications.map(app => (
        <div key={app.id} className="application-card">

          <h3 className="job-title">{app.job?.title}</h3>

          <p className="card-text">
            <b>Company:</b> {app.job?.companyName}
          </p>

          <p className="card-text">
            <b>Location:</b> {app.job?.location}
          </p>

          <span className={`status-badge ${app.status?.toLowerCase()}`}>
            {app.status}
          </span>

        </div>
      ))}
    </div>

  )}
</div>

  );
}

export default Applications;
