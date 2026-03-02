import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import PersonalInfo from "../profile/PersonalInfo";
import ProfessionalInfo from "../profile/ProfessionalInfo";
import JobPreferences from "../profile/JobPreferences";
import ResumeUpload from "./Resumeupload";
function Profile() {
  const [profile, setProfile] = useState({
    personalInfo: { fullName: "", city: "" },
    professionalInfo: { skills: "", education: "" },
    jobPreferences: { role: "", location: "" }
  });
  const [editMode, setEditMode] = useState(true);
  const [viewMode, setViewMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  // 🔹 FETCH PROFILE FOR LOGGED-IN USER
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
        setEditMode(false);
        setViewMode(true);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 SAVE PROFILE
  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          ...profile,
          email: user.email,
          role: "user",
          updatedAt: new Date()
        },
        { merge: true }
      );

      alert("Profile saved successfully ✅");
      setEditMode(false);
      setViewMode(true);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      {/* THREE DOTS MENU */}
      {profile && (
        <FiMoreVertical
          size={22}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            cursor: "pointer"
          }}
          onClick={() => setShowMenu(!showMenu)}
        />
      )}

      {/* DROPDOWN MENU */}
      {showMenu && (
        <div
         className="profile-menu"
        >
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              setViewMode(true);
              setEditMode(false);
              setShowMenu(false);
            }}
          >
            View Profile
          </p>

          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditMode(true);
              setViewMode(false);
              setShowMenu(false);
            }}
          >
            Edit Profile
          </p>
        </div>
      )}

      {/* EDIT MODE */}
      {editMode && (
        <>
          <PersonalInfo profile={profile} setProfile={setProfile} />
          <ProfessionalInfo profile={profile} setProfile={setProfile} />
          <JobPreferences profile={profile} setProfile={setProfile} />

          <div className="primary-btn">
            <button onClick={handleSave}>Save Profile 💾</button>

            <button className="secondary-btm"
              
              onClick={() => navigate("/dashboard")}
            >
              Exit ➡️ Apply Jobs
            </button>
          </div>
        </>
      )}

      {/* VIEW MODE */}
      {viewMode && profile && (
        < >
         <div className="view-card">
          <h3>Personal Info</h3>
          <p>Name: {profile.personalInfo?.fullName || "-"}</p>
          <p>City: {profile.personalInfo?.city || "-"}</p>
          <p>Phone: {profile.personalInfo?.phone || "-"}</p>
           <p>Email: {profile.personalInfo?.email || "-"}</p>
          <h3>Professional Info</h3>
          <p>Skills: {profile.professionalInfo?.skills || "-"}</p>
          <p>Education: {profile.professionalInfo?.education || "-"}</p>

          <h3>Job Preferences</h3>
          <p>Role: {profile.jobPreferences?.role || "-"}</p>
          <p>Location: {profile.jobPreferences?.location || "-"}</p>

         </div>
          
           <div>
      <h2>User Profile</h2>

      <ResumeUpload />

    </div>
          <button
            style={{ marginTop: "15px" }}
            onClick={() => setEditMode(true) && setViewMode(false)}
          >
            Edit Profile ✏️
          </button>

          <button
            style={{ marginTop: "15px", marginLeft: "10px" }}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard 🔍
          </button>
        </>
      )}
    </div>
  );
}

export default Profile;

