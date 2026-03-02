
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc,query,where } from "firebase/firestore";
import { db } from "../firebase";
import "./admin.css";

function UserVerification() {

  const [users, setUsers] = useState([]);

  
  const fetchUsers = async () => {

  const q = query(
    collection(db, "users"),
    where("role", "==", "user")   // ✅ ONLY NORMAL USERS
  );

  const snapshot = await getDocs(q);

  const list = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  setUsers(list);
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "users", id), {
      status: newStatus
    });
    fetchUsers();
  };

  return (
    <div className="admin-section">

      <h2>User Verification</h2>

      {users.map(user => (
        <div key={user.id} className="admin-card">

          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Status:</b> {user.status || "pending"}</p>

          <div className="admin-btn-group">

            {user.status !== "approved" && (
              <button
                className="approve-btn"
                onClick={() => updateStatus(user.id, "approved")}
              >
                Approve
              </button>
            )}

            <button
              className={
                user.status === "blocked"
                  ? "unblock-btn"
                  : "block-btn"
              }
              onClick={() =>
                updateStatus(
                  user.id,
                  user.status === "blocked" ? "approved" : "blocked"
                )
              }
            >
              {user.status === "blocked" ? "Unblock" : "Block"}
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default UserVerification;
