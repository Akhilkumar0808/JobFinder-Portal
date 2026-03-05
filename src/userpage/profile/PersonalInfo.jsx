import "./profilesection.css"; 
function PersonalInfo({ profile, setProfile }) {
  const data = profile?.personalInfo || {};

  const handleChange = (e) => {
    setProfile({
      ...profile,
      personalInfo: {
        ...data,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <section className="profile-section">
      <h3>Personal Information</h3>

      <input className="profile-input"
        name="fullName"
        placeholder="Full Name"
        value={data.fullName || ""}
        onChange={handleChange}
      />

      <input className="profile-input"
        name="email"
        placeholder="Email"
        value={data.email || ""}
        onChange={handleChange}
      />

      <input className="profile-input"
        name="phone"
        placeholder="Phone"
        value={data.phone || ""}
        onChange={handleChange}
      />

      <input className="profile-input"
        name="city"
        placeholder="City"
        value={data.city || ""}
        onChange={handleChange}
      />
    </section>
  );
}

export default PersonalInfo;