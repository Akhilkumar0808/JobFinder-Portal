import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./admin.css";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docSnap = await getDoc(doc(db, "users", user.uid));

      if (docSnap.exists() && docSnap.data().role === "admin") {
        navigate("/admin");
      } else {
        alert("Not authorized as Admin");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
  //   <form onSubmit={handleAdminLogin}>
  //     <h2>Admin Login</h2>

  //     <input
  //       type="email"
  //       placeholder="Email"
  //       onChange={(e) => setEmail(e.target.value)}
  //     />

  //     <input
  //       type="password"
  //       placeholder="Password"
  //       onChange={(e) => setPassword(e.target.value)}
  //     />

  //     <button type="submit">Login</button>
  //   </form>
  // );
  <div className="admin-login-container">

      <form onSubmit={handleAdminLogin} className="admin-login-form">

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default AdminLogin;
