
import { useState, useEffect } from "react";
import { auth,db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);

  //  Fetch Existing Resume
  useEffect(() => {
    const fetchResume = async () => {

      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists() && snap.data().resume) {
        setResumeUrl(snap.data().resume);
      }
    };

    fetchResume();
  }, []);

  const uploadResume = async () => {

    if (!file) {
      alert("Select resume file");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "JobPortal_Resume");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmju5mpdp/auto/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

      const resumeURL = data.secure_url;

      await setDoc(
        doc(db, "users", user.uid),
        { resume: resumeURL },
        { merge: true }
      );

      setResumeUrl(resumeURL);

      alert("Resume uploaded successfully 🎉");

    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
   <div className="resume-box">

  <h3>Upload Resume</h3>

  <input
    type="file"
    className="file-input"
    accept=".pdf"
    onChange={(e) => setFile(e.target.files[0])}
  />

  <button
    className="primary-btn"
    onClick={uploadResume}
  >
    {loading ? "Uploading..." : "Upload Resume"}
  </button>

  {resumeUrl && (
    <div className="resume-status">
      ✔ Resume Uploaded <br />
      <a href={resumeUrl} target="_blank" rel="noreferrer">
        View Resume
      </a>
    </div>
  )}

</div>

  );
}

export default ResumeUpload;
