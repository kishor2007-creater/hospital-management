function Services() {
  const services = [
    {
      title: "Emergency Care",
      desc: "24/7 emergency healthcare support with rapid response.",
      link: "https://www.redcross.org",
    },

    {
      title: "Online Consultation",
      desc: "Consult experienced doctors from your home.",
      link: "https://www.practo.com",
    },

    {
      title: "Laboratory Services",
      desc: "Advanced diagnostic and testing facilities.",
      link: "https://www.lalpathlabs.com",
    },

    {
      title: "ICU Facilities",
      desc: "Modern intensive care units with expert monitoring.",
      link: "https://www.apollohospitals.com/departments/critical-care",
    },

    {
      title: "Pharmacy",
      desc: "24-hour pharmacy with quality medicines.",
      link: "https://www.netmeds.com",
    },

    {
      title: "Ambulance Service",
      desc: "Fast ambulance services available anytime.",
      link: "https://www.medulance.com",
    },
  ];

  return (
    <section className="services-page">
      <div className="page-banner">
        <h1>Hospital Services</h1>

        <p>
          Providing advanced healthcare facilities with trusted medical support.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service, index) => (
          <div className="service-box" key={index}>
            <h2>{service.title}</h2>

            <p>{service.desc}</p>

            <a href={service.link} target="_blank" rel="noopener noreferrer">
              <button>Explore More</button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
