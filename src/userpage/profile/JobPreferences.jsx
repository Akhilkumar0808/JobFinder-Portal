
function JobPreferences({ profile, setProfile }) {
  const data = profile?.jobPreferences || {};

  const handleChange = (e) => {
    setProfile({
      ...profile,
      jobPreferences: {
        ...data,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <section>
      <h3>Job Preferences</h3>

      <input
        name="role"
        placeholder="Desired Role"
        value={data.role || ""}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Preferred Location"
        value={data.location || ""}
        onChange={handleChange}
      />

      <input
        name="salary"
        placeholder="Expected Salary"
        value={data.salary || ""}
        onChange={handleChange}
      />
    </section>
  );
}

export default JobPreferences;
