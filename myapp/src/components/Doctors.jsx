function Doctors() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Arun Kumar",
      specialization: "Cardiologist",
      experience: "12 Years Experience",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Neurologist",
      experience: "10 Years Experience",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    },
    {
      id: 3,
      name: "Dr. Rajesh Kumar",
      specialization: "Orthopedic Specialist",
      experience: "15 Years Experience",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
    },
  ];

  return (
    <section className="doctors-page">
      <div className="page-banner">
        <h1>Our Expert Doctors</h1>

        <p>
          Meet our experienced healthcare specialists dedicated to your
          wellness.
        </p>
      </div>

      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <img src={doctor.image} alt={doctor.name} />

            <div className="doctor-content">
              <h2>{doctor.name}</h2>

              <h4>{doctor.specialization}</h4>

              <p>{doctor.experience}</p>

              <button>Book Consultation</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Doctors;
