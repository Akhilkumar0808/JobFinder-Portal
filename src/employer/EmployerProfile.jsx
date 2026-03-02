import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function EmployerProfile() {

  const defaultData = {
    companyDetails: {
      companyName: "",
      location: "",
      website: "",
      description: ""
    },
    employerDetails: {
      employerName: "",
      designation: "",
      phone: "",
      email: "",
      experience: ""
    }
  };

  const [data, setData] = useState(defaultData);
  const [editMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) return;

      try {
        const snap = await getDoc(doc(db, "employers", user.uid));

        if (snap.exists()) {
          setData({ ...defaultData, ...snap.data() });
          setEditMode(false);
        }

      } catch (error) {
        console.error(error);
      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  const handleChange = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {

    const user = auth.currentUser;
    if (!user) return;

    try {

      await setDoc(
        doc(db, "employers", user.uid),
        {
          ...data,
          status: "pending"
        },
        { merge: true }
      );

      alert("Profile Saved Successfully");
      setEditMode(false);

    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>

      <h2>Company Details</h2>

      <input
        placeholder="Company Name"
        value={data.companyDetails.companyName}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("companyDetails", "companyName", e.target.value)
        }
      />

      <input
        placeholder="Location"
        value={data.companyDetails.location}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("companyDetails", "location", e.target.value)
        }
      />

      <input
        placeholder="Website"
        value={data.companyDetails.website}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("companyDetails", "website", e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        value={data.companyDetails.description}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("companyDetails", "description", e.target.value)
        }
      />

      <hr />

      <h2>Employer Details</h2>

      <input
        placeholder="Employer Name"
        value={data.employerDetails.employerName}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("employerDetails", "employerName", e.target.value)
        }
      />

      <input
        placeholder="Designation"
        value={data.employerDetails.designation}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("employerDetails", "designation", e.target.value)
        }
      />

      <input
        placeholder="Phone"
        value={data.employerDetails.phone}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("employerDetails", "phone", e.target.value)
        }
      />

      <input
        placeholder="Email"
        value={data.employerDetails.email}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("employerDetails", "email", e.target.value)
        }
      />

      <input
        placeholder="Experience"
        value={data.employerDetails.experience}
        disabled={!editMode}
        onChange={(e) =>
          handleChange("employerDetails", "experience", e.target.value)
        }
      />

      <br /><br />

      {editMode ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit</button>
      )}

    </div>
  );
}
