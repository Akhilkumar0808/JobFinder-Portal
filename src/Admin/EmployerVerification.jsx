import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "./admin.css";

function EmployerVerification() {

  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Employers
  const fetchEmployers = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(collection(db, "employers"));

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setEmployers(list);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching employers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  // 🔥 Update Status
  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "employers", id), {
        status: newStatus,
        updatedAt: new Date()
      });

      // Update state without refetch
      setEmployers(prev =>
        prev.map(emp =>
          emp.id === id ? { ...emp, status: newStatus } : emp
        )
      );

    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading Employers...</h3>;
  }

  return (
    <div className="admin-section">

      <h2 className="admin-title">Employer Verification</h2>

      {employers.length === 0 && (
        <p className="no-data">No employers found</p>
      )}

      {employers.map(emp => {

        const status = emp.status || "pending";

        return (
          <div key={emp.id} className="admin-card">

            <p><b>Company:</b> {emp.companyName || "N/A"}</p>
            <p><b>Employer Name:</b> {emp.name || emp.employerName || "N/A"}</p>
            <p><b>Location:</b> {emp.location || "N/A"}</p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${status}`}>
                {status}
              </span>
            </p>

            <div className="admin-btn-group">

              {status === "pending" && (
                <>
                  <button
                    className="approve-btn"
                    onClick={() => updateStatus(emp.id, "approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => updateStatus(emp.id, "rejected")}
                  >
                    Reject
                  </button>
                </>
              )}

              {status === "approved" && (
                <button
                  className="block-btn"
                  onClick={() => updateStatus(emp.id, "blocked")}
                >
                  Block
                </button>
              )}

              {status === "rejected" && (
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(emp.id, "approved")}
                >
                  Approve
                </button>
              )}

              {status === "blocked" && (
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(emp.id, "approved")}
                >
                  Unblock
                </button>
              )}

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default EmployerVerification;