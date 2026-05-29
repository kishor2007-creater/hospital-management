function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Advanced Hospital Management</h2>

          <p>
            Manage patients, doctors, services, and appointments efficiently
            with our modern healthcare management system.
          </p>

          <button>Explore Services</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>24/7 Emergency</h3>

          <p>
            Emergency medical support available anytime with experienced
            doctors.
          </p>
        </div>

        <div className="feature-card">
          <h3>Expert Doctors</h3>

          <p>
            Professional specialists available for all healthcare treatments.
          </p>
        </div>

        <div className="feature-card">
          <h3>Modern Equipment</h3>

          <p>Advanced medical technology for accurate diagnosis and care.</p>
        </div>
      </section>
    </>
  );
}

export default Home;
