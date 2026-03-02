import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./employer.css"
function EmployerLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmployerLogin = async (e) => {
    e.preventDefault();

    try {

      // ✅ Step 1: Firebase Auth Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // ✅ Step 2: Check Role
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        alert("User record not found");
        return;
      }

      const userData = userDoc.data();

      if (userData.role !== "employer") {
        alert("Access denied. Not an employer account.");
        return;
      }

      // ✅ Step 3: Check Employer Approval
      const employerDoc = await getDoc(doc(db, "employers", user.uid));

      if (!employerDoc.exists()) {
        alert("Employer profile not found");
        return;
      }

      const employerData = employerDoc.data();

      if (employerData.status !== "approved") {
        alert("Employer account pending admin verification");
        return;
      }

      // ✅ Step 4: Navigate Dashboard
      navigate("/employer-dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <h2 className="emp-title">Employer Login</h2>

      <form onSubmit={handleEmployerLogin} className="emp-form"> 

        <input
        className="emp-email"
          type="email"
          placeholder="Enter Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        

        <input
        className="emp-password"
          type="password"
          placeholder="Enter Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        
        <button className="emp-btn" type="submit">Login</button>

      </form>

      <p className="emp-footer">
        New Employer? <Link to="/employer-register">Register Here</Link>
      </p>
      </div>
    </div>
  );
}

export default EmployerLogin;