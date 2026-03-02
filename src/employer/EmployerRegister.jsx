import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./employer.css";

function EmployerRegister() {

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");   // ✅ NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔹 users collection
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "employer"
      });

      // 🔹 employers collection
      await setDoc(doc(db, "employers", user.uid), {
        name,
        companyName,
        location,      // ✅ STORED HERE
        email,
        status: "pending",  // better than verified: false
        createdAt: new Date()
      });

      alert("Registration submitted. Wait for admin verification.");

      navigate("/employer-login");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="emp-container">
      <div className="emp-card">

        <h2 className="emp-title">Employer Register</h2>

        <form onSubmit={handleRegister} className="emp-form">

          <input
            className="emp-input"
            placeholder="Employer Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="emp-input"
            placeholder="Company Name"
            required
            onChange={(e) => setCompanyName(e.target.value)}
          />

          {/* ✅ NEW LOCATION FIELD */}
          <input
            className="emp-input"
            placeholder="Company Location"
            required
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="emp-input"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="emp-input"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="emp-btn">Register</button>

        </form>

      </div>
    </div>
  );
}

export default EmployerRegister;