import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="header"
    style={styles.header}>
      {/* Three dots */}
      <div className="header-icon"
        style={styles.icon}
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        ⋮
        {showMenu && (
          <div className="dropdown" 
          style={styles.dropdown}>
            <p onClick={() => navigate("/profile")}>Create Profile</p>
            <p onClick={() => navigate("/dashboard")}>Dashboard</p>
          </div>
        )}
      </div>

      <h2 className="logo">JobFinder</h2>
      {/* <div style={styles.icon}>🔍</div>*/}
    {/* SEARCH ICON – FIXED */}
      <div className="header-icon"
        style={styles.icon}
        onClick={() => navigate("/search")}
        title="Search latest jobs"
      >
        🔍
      </div>
    </div> 
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid #ffffff"
  },
  icon: { cursor: "pointer", position: "relative" },
  dropdown: {
    position: "absolute",
    top: "25px",
    background: "#ffffff",
    border: "1px solid #ccc",
    padding: "10px",
    width: "200px"
  }
};

export default Header;
