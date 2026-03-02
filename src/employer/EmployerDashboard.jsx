import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Sidebar from "./SideBar";
import EmployerProfile from "./EmployerProfile";
import PostJobs from "./PostJobs";
import JobList from "./JobList";
import EmployerApplications from "./EmployerApplications";
import EmployerInterviews from "./EmployerInterviews";
 
export default function EmployerDashboard() {

  const [activeTab, setActiveTab] = useState("profile");
  const [status, setStatus] = useState("loading");

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) return;

      try {
        const snap = await getDoc(doc(db, "employers", user.uid));

        if (snap.exists()) {
          setStatus(snap.data().status || "pending");
        } else {
          setStatus("noProfile");
        }

      } catch (error) {
        console.error(error);
      }

    });

    return () => unsubscribe();

  }, []);

  if (status === "loading")
    return <h3 style={styles.center}>Loading Dashboard...</h3>;

  if (status === "noProfile")
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Please Create Your Employer Profile</h2>
          <EmployerProfile />
        </div>
      </div>
    );

  if (status === "pending")
    return <h2 style={styles.center}>Your profile is waiting for admin approval ⏳</h2>;

  if (status === "rejected")
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Your profile was rejected. Please edit and resubmit.</h2>
          <EmployerProfile />
        </div>
      </div>
    );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <EmployerProfile />;
      case "postjob":
        return <PostJobs />;
      case "jobs":
        return <JobList />;
      case "applications":
        return <EmployerApplications />;
      case "interviews":
        return <EmployerInterviews/>;  
      default:
        return <EmployerProfile />;
    }
  };

  return (
    <div style={styles.dashboard}>
      <Sidebar setActiveTab={setActiveTab} />

      <div style={styles.main}>
        <div style={styles.contentCard}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const styles = {

  dashboard: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8"
  },

  main: {
    flex: 1,
    padding: "30px"
  },

  contentCard: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8"
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "500px"
  },

  center: {
    textAlign: "center",
    marginTop: "40px"
  }

};
