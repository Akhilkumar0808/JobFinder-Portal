function ProfessionalInfo({ profile, setProfile }) {
 
  const data = profile?.professionalInfo || {};

  const handleChange = (e) => {
    setProfile({
      ...profile,
      professionalInfo: {
        ...data,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <section>
      <h3>Professional Background</h3>

      <textarea
        name="experience"
        placeholder="Work Experience"
        value={data.experience || ""}
        onChange={handleChange}
      />

      <input
        name="skills"
        placeholder="Skills"
        value={data.skills || ""}
        onChange={handleChange}
      />

      <input
        name="education"
        placeholder="Education"
        value={data.education || ""}
        onChange={handleChange}
      />
    </section>
  );
}

export default ProfessionalInfo;