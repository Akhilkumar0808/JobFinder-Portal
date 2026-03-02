
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function EmployerNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/employer/login");
  };

  return (
    <div style={styles.nav}>
      <h3>Employer Panel</h3>

      <div style={styles.links}>
        <button onClick={() => navigate("/employer/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/employer/profile")}>Profile</button>
        <button onClick={() => navigate("/employer/post-job")}>Post Job</button>
        <button onClick={() => navigate("/employer/jobs")}>Manage Jobs</button>
        <button onClick={() => navigate("/employer/applications")}>Applications</button>
        <button onClick={() => navigate("/employer/interviews")}>Interviews</button>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
export default EmployerNavbar;