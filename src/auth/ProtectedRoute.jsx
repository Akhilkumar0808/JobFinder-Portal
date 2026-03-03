
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const isAuth = localStorage.getItem("isAuth");
//   return isAuth ? children : <Navigate to="/user-login" />;
// }

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 WAIT until Firebase finishes checking
  if (user === undefined) {
    return <p>Loading...</p>;
  }

  // If logged in
  if (user) {
    return children;
  }

  // If not logged in
  return <Navigate to="/user-login" />;
}

export default ProtectedRoute;